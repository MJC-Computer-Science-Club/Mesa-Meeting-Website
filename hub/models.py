from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

# Create your models here.
class Hub(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name + " hub"

class HubMembership(models.Model):
    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} + {self.hub}"
    
    class Meta:
        unique_together = ('user', 'hub')