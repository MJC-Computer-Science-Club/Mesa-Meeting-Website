from django.db import models

# Create your models here.
class User(models.Model):
    #Primary Key auto generated
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bio = models.TextField(max_length=200)