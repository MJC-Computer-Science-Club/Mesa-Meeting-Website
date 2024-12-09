from django.shortcuts import render
from rest_framework import permissions, viewsets
from rest.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from hub.models import Hub
from serializers import HubSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access this endpoint
def list_user_hubs(request):
    # Filter hubs where the user is a member
    user_hubs = Hub.objects.filter(members=request.user)

    # Serialize the list of hubs
    serializer = HubSerializer(user_hubs, many=True)

    # Return the serialized data
    return Response(serializer.data)