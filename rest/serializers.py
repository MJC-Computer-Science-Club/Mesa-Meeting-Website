# from user.models import User
from django.contrib.auth.models import User
from hub.models import Hub
from rest_framework import serializers

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ["url", "email", "username", "password"]

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "password", "email"]

class HubSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Hub
        fields = ["id", "name"]