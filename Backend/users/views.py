from rest_framework import status, permissions
from rest_framework.generics import RetrieveAPIView, ListAPIView, GenericAPIView, CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (UserSerializer, OrganizationRegisterSerializer, 
                          AddWorkerSerializer, CustomLoginSerializer, AttendanceSerializer,
                          OrganizationSerializer, QrcodeSerializer, WorkersSerializer
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
class ClockInView(CreateAPIView):
    serializer_class = AttendanceSerializer
    queryset = Attendance.objects.all()
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    
    def get_object(self):
        user_obj = self.request.user
        worker = Workers.objects.get(user=user_obj)
        return worker
        
    def perform_create(self, serializer):
        worker = self.get_object(self)
        return serializer.save(worker=worker)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
    
# ClockOutView     
class ClockOutView(APIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    
    
    def get_object(self, qrcode_id, worker):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            return Attendance.objects.get(qrcode_id=qrcode_id, worker=worker)
        except Attendance.DoesNotExist:
            return None
        
    
    def put(self, request, qrcode_id, *args, **kwargs):
        user_obj = self.request.user
        worker = Workers.objects.get(user=user_obj)
        attendance_instance = self.get_object(qrcode_id, worker)
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
    queryset = Workers.objects.all()
    serializer_class = WorkersSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def get_object(self):
        user_obj = self.request.user
        organization = Organizations.objects.get(user=user_obj)
        return organization
    
    def get_queryset(self):
        organization = self.get_object()
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
class GenerateQrcodeView(UpdateAPIView):
    serializer_class = QrcodeSerializer
    queryset = Qrcode.objects.all()
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    lookup_field = "organization_id"
   
    def get_object(self):
        user_obj = self.request.user
        organization = Organizations.objects.get(user=user_obj)
        return organization
    
    def update(self, request, *args, **kwargs):
        current_organization = self.get_object()
        qrcode_instance = Qrcode.objects.get(organization=current_organization)
        if not qrcode_instance:
            data = {
                'organization' : current_organization,
                'UUID' : generate_random_uuid(),
            }
            serializer = self.serializer_class(data=data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        serializer = self.get_serializer(qrcode_instance, data=request.data, partial=True)
        return Response(serializer.save(UUID=generate_random_uuid()), status=status.HTTP_200_OK)

#GetQRcodeUUIDView
class GetQrcodeIdView(APIView):
    serializer_class = QrcodeSerializer
    permission_classes = [IsWorker&permissions.IsAuthenticated]
    def get(self, request):
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
    queryset = Attendance.objects.all()
    serializer_class= AttendanceSerializer
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    
    def get_object(self):
        user_obj = self.request.user
        organization = Organizations.objects.get(user=user_obj)
        return organization
    
    def get_queryset(self):
        organization = self.get_object(self)
        workers= Workers.objects.filter(organization=organization)
        all_attendance = []
        for worker in workers:
            attendance = self.queryset.filter(worker=worker)
            all_attendance.append(attendance)
        return Response(all_attendance, status=status.HTTP_200_OK)
    
