from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phonenumber = models.CharField(null=True)
    classroom = models.CharField(max_length=255, null=True)
    gradelevels = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to='user_images/', null=True, default="bk1.jfif")
    address = models.CharField(max_length=255, default='No address provided', null=True)
    identificationcard = models.CharField(null=True)
    educationstage = models.CharField(max_length=255, null=True)
    usertype = models.CharField(max_length=255, null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # groups = models.ManyToManyField(Group, related_name='user_set')
    # user_permissions = models.ManyToManyField(Permission, related_name='user_set')
    #
