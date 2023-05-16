from datetime import timezone
import datetime
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from django.db import models


# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    ROLES = (
        ('developer', 'Developer'),
        ('instructor', 'Instructor'),
        ('recruiter', 'Recruiter'),
        ('analyst', 'Analyst'),
    )
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    bio = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLES, default='')
    eggs = models.IntegerField(default=0)
    pycoins = models.IntegerField(default=0)
    lives = models.IntegerField(default=3)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def is_developer(self):
        return self.role == 'developer'

    def is_instructor(self):
        return self.role == 'instructor'

    def is_recruiter(self):
        return self.role == 'recruiter'

    def is_analyst(self):
        return self.role == 'analyst'
