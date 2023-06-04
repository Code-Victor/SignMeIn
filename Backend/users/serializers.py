from rest_framework import serializers, request
from django.contrib.auth.models import update_last_login
from rest_framework.authentication import authenticate
from rest_framework.validators import ValidationError
from .models import CustomUser, Organizations, Workers
import string
import random
from rest_framework_simplejwt.tokens import RefreshToken


#Generate random password for workers
# def generate_random_password():
#     # get random password of length 8 with letters, digits, and symbols
#     characters = string.ascii_letters + string.digits + string.punctuation
#     password = ''.join(random.choice(characters) for i in range(12))
#     return password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'email', 'is_organization'
        ]


class OrganizationRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=400000)
    number_of_workers = serializers.IntegerField()
    company_address = serializers.CharField(max_length= 30000)
    class Meta:
        model = CustomUser
        fields = [
            'name','email', 'description', 'number_of_workers',
            'company_address','password', 'confirm_password'
        ]
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': True},
            'number_of_workers': {'required': True},
            'company_address': {'required': True}
        }
        
        
    def save(self, **kwargs):
        user = CustomUser(
            email = self.validated_data['email']
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        
        if password != confirm_password:
            raise ValidationError({"error": "Password do not match"})
        user.set_password(password)
        user.is_organization = True
        user.save()
        Organizations.objects.create(
            user = user,
            name = self.validated_data['name'],
            description = self.validated_data['description'],
            number_of_workers = self.validated_data['number_of_workers'],
            company_address = self.validated_data['company_address']
        )
        return user
  
class CustomLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'access', 'refresh']
        
    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)
    
        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user)

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
            }

            return validation
        except:
            raise serializers.ValidationError("Invalid login credentials")
    
 
class AddWorkerSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    gender = serializers.CharField(max_length=20)
    age = serializers.IntegerField()
    house_address = serializers.CharField(max_length= 30000)
    password = serializers.CharField(max_length=50)
   
        
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'email',
            'gender', 'age', 'house_address', 'password',  'confirm_password'
        ]
        
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'gender': {'required': True},
            'age': {'required': True},
            'house_address': {'required': True},
            'password': {'required': True}
        }
       
    def get_current_organization(self):
        current_organization = self.context['request'].user
        get_current_organization_id = list(CustomUser.organization.filter(email=current_organization).values('id'))
        organization_user_id = get_current_organization_id[0]['id']
        organization= Organizations.objects.get(user_id=organization_user_id)
        return organization
        
    def save(self, **kwargs):
        user = CustomUser(
            email = self.validated_data['email'],
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        if password != confirm_password:
            raise ValidationError({"error": "Password do not match"})
        
        user.set_password(password)
        user.is_worker = True
        user.is_organization = False
        user.save()
       
        worker = Workers(
                user = user,
                organization = self.get_current_organization(),
                first_name = self.validated_data['first_name'],
                last_name = self.validated_data['last_name'],
                gender = self.validated_data['gender'],
                age = self.validated_data['age'],
                house_address = self.validated_data['house_address']
            )
        worker.save()
        return user
    
