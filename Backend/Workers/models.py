from django.db import models
from Organizations.models import Organizations

# Create your models here.
class Workers(models.Model):
    Organization = models.ForeignKey(Organizations, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length= 80)
    email_address = models.EmailField(unique=True)
    gender = models.CharField(max_length= 20)
    age = models.IntegerField()
    house_address = models.TextField()
    password = models.CharField(max_length= 50)
