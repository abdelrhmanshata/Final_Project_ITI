from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phonenumber = models.CharField(null=True, blank=True)
    classroom = models.CharField(max_length=255, null=True, blank=True)
    gradelevels = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(
        upload_to="user_images/", null=True, default="default.png", blank=True
    )
    address = models.CharField(
        max_length=255, default="No address provided", null=True, blank=True
    )
    identificationcard = models.CharField(null=True, blank=True)
    educationstage = models.CharField(max_length=255, null=True, blank=True)
    usertype = models.CharField(max_length=255, null=True, blank=True)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
