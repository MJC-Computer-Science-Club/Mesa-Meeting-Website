from django.db import models

# Create your models here.
class User(models.Model):
    #Primary Key auto generated
    username = models.CharField(max_length=16)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=30)
    bio = models.TextField(max_length=200)