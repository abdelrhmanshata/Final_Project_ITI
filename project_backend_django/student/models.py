from django.db import models
from django.conf import settings
from .enums import EducationStage
User = settings.AUTH_USER_MODEL

# from ..user_authentication_app.models import User
# Create your models here.


class Student(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="", blank=False)
    birthdate = models.DateField(null=True)
    password = models.CharField(max_length=255)
    classroom = models.CharField(max_length=255, null=True)
    educationstage = models.CharField(max_length=255, null=True, choices=EducationStage.choices)
    email = models.EmailField(unique=True)
    phonenumber = models.CharField(null=True)
    image = models.ImageField(upload_to='user_images/', null=True, default="bk1.jfif")
    address = models.CharField(max_length=255, default='No address provided', null=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    # groups = models.ManyToManyField(Group, related_name='student_set')
    # user_permissions = models.ManyToManyField(Permission, related_name='student_set')




