from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest.serializers import UserSerializer
from user.models import User

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or created
    """
    queryset = User.objects.all().order_by("-first_name")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]