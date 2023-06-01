from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import UserSerializer, OrganizationRegisterSerializer, OrganizationCustomLoginSerializer, AddWorkerSerializer
from .permissions import IsOrganization
from .models import CustomUser, Organizations

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

#Organization Login View    
class OrganizationLoginView(GenericAPIView):
    serializer_class = OrganizationCustomLoginSerializer
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
        
        
        
# class AddWorkerView(ModelViewSet):
#     serializer_class = AddWorkerSerializer
#     queryset = CustomUser.objects.none()
#     # authentication_classes = [IsOrganization]
#     permission_classes = [permissions.IsAuthenticated&IsOrganization]
    
#     def create(self, request, *args, **kwargs):
#         user = request.user.id
#         new_user = Organizations.objects.get(user_id=user)
#         print(new_user)
#         serializer = self.get_serializer(data=request.data, context={'organization': new_user})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#             "user" : UserSerializer(user, context=self.get_serializer_context()).data
#         })
        
class OrganizationDashboardView(RetrieveAPIView):
    permission_classes = [IsOrganization&permissions.IsAuthenticated]
    # authentication_classes = [IsOrganization]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user