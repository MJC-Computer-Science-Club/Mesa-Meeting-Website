# from user.models import User
from django.contrib.auth.models import User
from hub.models import Hub, HubMembership, Message
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

    name = serializers.StringRelatedField()

    class Meta(object):
        model = Hub
        fields = ["id", "name"]

class HubMembershipSerializer(serializers.ModelSerializer):

    hub = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta(object):
        model = HubMembership
        fields = ["hub", "user"]

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    hub = serializers.SlugRelatedField(queryset=Hub.objects.all(), slug_field='name')
    content = serializers.CharField()

    class Meta(object):
        model = Message
        fields = ['id', 'hub', 'user', 'content', 'created_at']
