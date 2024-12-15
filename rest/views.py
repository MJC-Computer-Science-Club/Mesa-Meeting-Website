from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest.serializers import UserSerializer, HubSerializer, HubMembershipSerializer, MessageSerializer, HubChannelSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from hub.models import Hub, HubMembership, Message, HubChannel
from django.contrib.auth import authenticate, login

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or created
#     """
#     queryset = User.objects.all().order_by("-username")
#     serializer_class = UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]
    
#     def get_permissions(self):
#         if self.action == 'create':
#             permission_classes = []
#         else:
#             permission_classes = [permissions.IsAuthenticated]
#         return [permission() for permission in permission_classes]

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def loginReq(request):
    print(request.data)
    user = authenticate(request, username=request.data['username'], password=request.data['password'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    
    login(request, user)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_user_hubs(request):
    # Filter hubs where the user is a member
    user_hubs = HubMembership.objects.filter(user=request.user)

    # print(user_hubs)
    # Serialize the list of hubs
    serializer = HubMembershipSerializer(user_hubs, many=True)
    # print(serializer)

    # Return the serialized data
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_channel_hubs(request):
    # print("!!!!!!!!!!!!!", request.data["hub"])
    specificHub = Hub.objects.get(name=request.data["hub"])
    # print("1111111111111111 ",specificHub)
    hub_channels = HubChannel.objects.filter(hub=1)
    # print("222222222222", hub_channels)
    # Serialize the list of hubs
    serializer = HubChannelSerializer(hub_channels, many=True)
    # print("333333333333333", serializer.data)

    # Return the serialized data
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_specific_channel_hub(request):
    print("!!!!!!!!", request.data)
    # Filter hubs where the user is a member
    hub_channels = HubChannel.objects.get(id=request.data["id"])
    print("Hub Channel!!!!!!!", hub_channels)
    messages = hub_channels.messages.all().order_by('created_at')

    # Serialize the list of hubs
    serializer = HubChannelSerializer(hub_channels)
    messageSerializer = MessageSerializer(messages, many=True)

    # Return the serialized data    
    return Response({
        "hub": serializer.data,
        "messages": messageSerializer.data
    })

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_specific_hub(request):
    # Filter hubs where the user is a member
    user_hubs = Hub.objects.get(name=request.data["name"])

    # messages = user_hubs.messages.all().order_by('created_at')

    # Serialize the list of hubs
    serializer = HubSerializer(user_hubs)
    # messageSerializer = MessageSerializer(messages, many=True)

    # Return the serialized data    
    return Response({
        "hub": serializer.data,
        # "messages": messageSerializer.data
    })

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def post_Message_To_Hub(request):
    serializer = MessageSerializer(data = request.data)
    if serializer.is_valid():

        serializer.save()
        print(serializer.data)
        return Response({"message": serializer.data})
    print("Failed")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)