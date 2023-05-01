from django.db import models

# Create your models here.
class Organizations(models.Model):
    name = models.CharField(max_length= 80)
    email = models.EmailField(unique=True)
    description = models.TextField()
    number_of_workers = models.IntegerField()
    company_address = models.CharField(max_length= 100)
    password = models.CharField(max_length= 50, unique=True)
    
