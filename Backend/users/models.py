from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.
# Custom user model to manage our users
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_organization_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password and role(is_organization).
        """
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_organization = True
        user.is_worker = False
        user.save()
        return user
    
    def create_worker_user(self, email, password, **extra_fields):

        """
        Create and save a user with the given email and password and role(is_worker).
        """
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_organization = False
        user.is_worker = True
        user.save()
        return user
    
#Get all the users with the role is_organization    
class OrganizationManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_organization=True)

#Get all the users with the role is_worker    
class WorkersManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_worker=True)

#model for users
class CustomUser(AbstractUser):
    email = models.CharField(unique=True)
    username = models.CharField(max_length=200)
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
    
    objects = CustomUserManager()
    organization = OrganizationManager()
    workers = WorkersManager()
    
#model for organizations
class Organizations(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    number_of_workers = models.IntegerField(null=True, blank=True)
    company_address = models.CharField(max_length= 300, blank=True)
    
    def __str__(self):
        return self.user.email
    
#Model for workers 
class Workers(models.Model):
    worker_sex = [
        ("MALE", "Male"),
        ("FEMALE", 'Female')
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organizations, on_delete=models.CASCADE, related_name='organization_workers')
    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(choices=worker_sex, max_length=20)
    age = models.IntegerField()
    house_address = models.TextField()
    
    def __str__(self):
        return self.user.email
    
#model to manage attendance    
class Attendance(models.Model):
    worker = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='worker_attendance')
    qrcode_id = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    clock_in = models.TimeField(auto_now_add=True)
    clock_out = models.TimeField(auto_now=True)

#model for QRcode    
class Qrcode(models.Model):
    organization = models.OneToOneField(Organizations, on_delete=models.CASCADE)
    UUID = models.CharField(max_length=100)
