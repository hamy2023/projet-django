import genericpath
from django.shortcuts import render
from django.utils.deprecation import MiddlewareMixin

# Create your views here.
from django.contrib.auth import authenticate, login
from accounts.models import User
import pyotp
from django.shortcuts import redirect
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserRoleSerializer


class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserRoleSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
