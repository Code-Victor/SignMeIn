from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response
from .serializers import (UserSerializer, OrganizationRegisterSerializer, 
                          AddWorkerSerializer, CustomLoginSerializer
                          )
from .permissions import IsOrganization, IsWorker

# Create your views here.

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
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],    
                }
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