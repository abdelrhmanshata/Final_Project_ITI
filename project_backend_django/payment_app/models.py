from django.db import models
from courseListAPI.models import Course
from user_authentication_app.models import User
from django.utils import timezone
# Create your models here.


class Payment_Course(models.Model):
    course_model = models.ForeignKey(Course, on_delete=models.CASCADE)
    user_model = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentID = models.CharField(max_length=255)
    courseDate = models.DateField(default=timezone.now, null=True)
