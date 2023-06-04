from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Create your models here.
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
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_organization_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_organization = True
        user.is_worker = False
        user.save()
        return user
    
    def create_worker_user(self, email, password, **extra_fields):

        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_organization = False
        user.is_worker = True
        user.save()
        return user
    
    
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
    
    objects = CustomUserManager()
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
        return self.user.email