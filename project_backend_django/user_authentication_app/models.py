from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.base_user import BaseUserManager


# this is used to create a superuser using an email instead of username
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phonenumber = models.CharField(null=True)
    classroom = models.CharField(max_length=255, null=True)
    gradelevels = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to="user_images/", null=True, default="user.png")
    address = models.CharField(max_length=255, default="No address provided", null=True)
    identificationcard = models.CharField(null=True)
    educationstage = models.CharField(max_length=255, null=True)
    usertype = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    subject = models.CharField(null=True)
    teacher_avg_score = models.FloatField(default=0)
    objects = UserManager()

    # is_staff = models.BooleanField()
    isApprove = models.BooleanField(default=False)
    username=None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class PasswordReset(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255, unique=True)
