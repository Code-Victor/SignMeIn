from rest_framework import status, permissions
from rest_framework.generics import RetrieveAPIView, ListAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (UserSerializer, OrganizationRegisterSerializer, 
                          AddWorkerSerializer, CustomLoginSerializer, AttendanceSerializer,
                          OrganizationSerializer, QrcodeSerializer
                          )
from .permissions import IsOrganization, IsWorker
from .models import CustomUser, Attendance, Organizations, Workers, Qrcode
import string
import random

# Create your views here.
def generate_random_uuid():
    # get random password of length 50
    characters = string.digits
    uuid = ''.join(random.choice(characters) for i in range(50))
    return int(uuid)


#Organization Registration View
class OrganizationRegisterView(GenericAPIView):
    serializer_class = OrganizationRegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user" : UserSerializer(user, context=self.get_serializer_context()).data
        })

#Login View for users    
class LoginView(GenericAPIView):
    serializer_class = CustomLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        if valid:
            username = list(CustomUser.objects.filter(email=serializer.data['email']).values('username'))[0]['username']
            user_id = list(CustomUser.objects.filter(email=serializer.data['email']).values('id'))[0]['id']
            if list(CustomUser.objects.filter(email=serializer.data['email']).values('is_organization'))[0]['is_organization']:
                role = 'is_organization'
            else:
                role = 'is_worker'
                
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'id': user_id,
                'username': username,
                'email': serializer.data['email'],
                'role' : role   
            }
                
            return Response(response, status=status_code)
        
        
#Add worker view   
class AddWorkerView(GenericAPIView):
    serializer_class = AddWorkerSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user" : UserSerializer(user, context=self.get_serializer_context()).data
        })

# Organization Dashboard View  
class OrganizationDashboardView(RetrieveAPIView):
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
    
# Worker Dashboard View  
class WorkersDashboardView(RetrieveAPIView):
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
    
# ClockIn View 
class ClockInView(APIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    
    def post(self, request):
        data = {
            'qrcode_id': request.data.get('qrcode_id'),
            'worker': request.user.id,
            'clock_in': request.data.get('clock_in'), 
            'clock_out': request.data.get('clock_out'),    
        }
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
    
# ClockOutView     
class ClockOutView(APIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    
    
    def get_object(self, qrcode_id, user_id):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Attendance.objects.get(qrcode_id=qrcode_id, worker_id = user_id)
        except Attendance.DoesNotExist:
            return None
        
    
    def put(self, request, qrcode_id, *args, **kwargs):
        attendance_instance = self.get_object(qrcode_id, request.user.id)
        if not attendance_instance:
            return Response(
                {"res": "Object with id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = { 
            'clock_out': request.data.get('clock_out'), 
            'user': request.user.id
        }
        serializer = ClockOutView.serializer_class(instance = attendance_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
# Get workers details view
class WorkersDetailView(ListAPIView):
    queryset = Organizations.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def get_object(self):
        user_obj = self.request.user
        school = Organizations.objects.get(user=user_obj)
        return school
    
    def get_queryset(self):
        organization = self.get_object(self)
        return self.queryset.filter(organization=organization)
    
# Attendance details view
class AttendanceDetailView(APIView):
    # queryset = Organizations.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
        
    def get(self, request, *args, **kwargs):
        get_user_attendance = Attendance.objects.filter(worker=request.user.id).values('date', 'clock_in', 'clock_out')
        user_attendace = []
        for attendance in get_user_attendance:
            user_attendace.append(attendance)

        return Response(user_attendace, status=status.HTTP_200_OK)

#Generate QRcode view     
class GenerateQrcodeView(APIView):
    serializer_class = QrcodeSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
   
    def get_object(self, organization_id):
        try:
            return Qrcode.objects.get(organization_id = organization_id)
        except Qrcode.DoesNotExist:
            return None
    
    def put(self, request, organization_id ,*args, **kwargs):
        qrcode_instance = self.get_object(organization_id)
        get_current_organization = CustomUser.organization.filter(email=request.user)
        organization_user_id = list(get_current_organization.values('id'))[0]['id']
        if get_current_organization:
            if not qrcode_instance:
                data = { 
                    'organization': organization_user_id,
                    'UUID': generate_random_uuid(),
                }
                serializer =  self.serializer_class(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                
            data = { 
                'UUID': generate_random_uuid(),
            }
            
            serializer =  GenerateQrcodeView.serializer_class(instance=qrcode_instance, data=data, partial = True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#GetQRcodeUUIDView
class GetQrcodeIdView(APIView):
    serializer_class = QrcodeSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    def get(self, request, organization_id):
        qrcode_instance = Qrcode.objects.filter(organization=organization_id)
        qrcode_uuid = list(qrcode_instance.values('UUID'))[0]['UUID']
        if not qrcode_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        return Response(
            {'UUID': qrcode_uuid},
            status=status.HTTP_200_OK
        )
      
# list organization workers attendance history
class TimeRecordView(APIView):
    serializer_class= AttendanceSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def get_object(self, organization_id):
        try:
            return list(Workers.objects.filter(organization = organization_id).values('user_id', 'first_name', 'last_name'))
        except Workers.DoesNotExist:
            return None
        
    def get(self, request):
        current_user_id = request.user.id
        organization_id = list(Organizations.objects.filter(user=current_user_id).values('id'))[0]['id']
        workers_instances = self.get_object(organization_id)
        workers_attendance = {}
        for worker_id in workers_instances:
            # registered_workers.append(worker_id['user_id'])
            get_workers_attendance = list(Attendance.objects.filter(worker = worker_id['user_id']).values('date', 'clock_in', 'clock_out'))
            workers_attendance[worker_id['first_name']+worker_id['last_name']] = get_workers_attendance

        return Response(workers_attendance, status=status.HTTP_200_OK)


class AttendanceRecordView(APIView):
    def get_object(self, organization_id):
        try:
            return list(Workers.objects.filter(organization = organization_id).values('user_id', 'first_name', 'last_name'))
        except Workers.DoesNotExist:
            return None
    serializer_class= AttendanceSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def get(self, request):
        current_user_id = request.user.id
        organization_id = list(Organizations.objects.filter(user=current_user_id).values('id'))[0]['id']
        workers_instances = self.get_object(organization_id)
        organization_workers_id = []
        for worker in workers_instances:
            organization_workers_id.append(worker['user_id'])
        workers_attendance = []
        all_attendance = list(Attendance.objects.all())
        for attendance in all_attendance:
            worker_attendance = {}
            if attendance.worker.id in organization_workers_id:
                first_name = list(Workers.objects.filter(user_id = attendance.worker.id).values('first_name'))[0]['first_name']
                last_name = list(Workers.objects.filter(user_id = attendance.worker.id).values('last_name'))[0]['last_name']
                worker_attendance['name'] = first_name + last_name
                worker_attendance['date'] = attendance.date
                worker_attendance['clock_in'] = attendance.clock_in
                worker_attendance['clock_out'] = attendance.clock_out
                workers_attendance.append(worker_attendance)
            
        return Response(workers_attendance, status=status.HTTP_200_OK)
    
