from rest_framework import serializers
from rest_framework.validators import ValidationError
from .models import CustomUser, Organizations, Workers
import string
import random
# from rest_auth.registration.serializers import RegisterSerializer
# from rest_framework.validators import UniqueValidator
# from django.contrib.auth.password_validation import validate_password
# from Workers.models import Workers

def generate_random_password():
    # get random password of length 8 with letters, digits, and symbols
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(12))
    return password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'email', 'username',  'is_organization'
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
        
        
class AddWorkerSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    gender = serializers.CharField(max_length=20)
    age = serializers.IntegerField()
    house_address = serializers.CharField(max_length= 30000)
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'lastt_name', 'email', 
            'gender', 'age', 'house_address'
        ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'gender': {'required': True},
            'age': {'required': True},
            'house_address': {'required': True}
        }
        
        
    def save(self, **kwargs):
        user = CustomUser(
            email = self.validated_data['email']
        )
        password = generate_random_password()
        user.set_password(password)
        user.is_worker = True
        user.save()
        Workers.objects.create(
            user = user,
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            gender = self.validated_data['gender'],
            age = self.validated_data['age'],
            house_address = self.validated_data['house_address']
        )
        return user
    
# 3# class OrganizationLoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Organizations
#         fields = ['email', 'password']
#         extra_kwargs = {
#             'email':{'required': True},
#             'password': {'required': True}
#         }
        
# class WorkerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Workers
#         fields = ['id', 'Organization','first_name', 
#                   'last_name','email_address',
#                   'gender', 'age', 'house_address', 'password']
#         extra_kwargs = {'Organization': {'required': True},
#                         'first_name':{'required': True},
#                         'last_name':{'required': True},
#                         'email_address': {'required': True},
#                         'gender': {'required': True},
#                         'age':{'required': True},
#                         'house_address': {'required': True},
#                         'password': {'required': True}
#                         }