from django.db import models
from ..user_authentication_app import models
# Create your models here.


class StudentReviewCourse(models.Model):
    studentID = models
# #*S_ID,#*CourseID,ReviewRating,ReviewText




class StudentReviewTeacher(models.Model):
    pass
# #*T_ID,#*S_ID,ReviewRating,ReviewText


class StudentEnrollsInCourse(models.Model):
    pass
# #*S_ID,#*CourseID
