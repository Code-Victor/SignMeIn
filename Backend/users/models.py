from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.query import QuerySet

# Create your models here.
class OrganizationManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_organization=True)
    
class WorkersManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_worker=True)


class CustomUser(AbstractUser):
    email = models.CharField(unique=True)
    username = None
    is_superuser = None
    is_staff = None
    first_name = None
    last_name = None
    is_organization = models.BooleanField(null=True)
    is_worker = models.BooleanField(null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        
    ]
    
    def __str__(self):
        return self.email
    
    organization = OrganizationManager()
    workers = WorkersManager()
    

class Organizations(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    number_of_workers = models.IntegerField(null=True, blank=True)
    company_address = models.CharField(max_length= 300, blank=True)
    
    def __str__(self):
        return self.user.email
    

class Workers(models.Model):
    worker_sex = [
        ("MALE", "Male"),
        ("FEMALE", 'Female')
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organizations, on_delete=models.CASCADE)
    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(choices=worker_sex, max_length=20)
    age = models.IntegerField()
    house_address = models.TextField()
    
    def __str__(self):
        return self.user.emai;