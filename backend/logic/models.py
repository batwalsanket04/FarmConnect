from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
 

# Create your models here.
 

class Farmer(models.Model):
    f_name=models.CharField(max_length=100)
    f_phone=PhoneNumberField()
    f_village=models.CharField(max_length=100)
    f_email=models.EmailField()
    f_password=models.CharField(max_length=100)
    
    def __str__(self):
            return self.f_name


