from django.db import models
from courseListAPI.models import Course
# Create your models here.

class Payment_Course(models.Model):
    course_model = models.ForeignKey(Course, on_delete=models.CASCADE)