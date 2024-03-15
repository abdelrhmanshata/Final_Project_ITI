from django.db import models
from django.utils import timezone
from user_authentication_app.models import *
from reviews import models as reviewModel
# Create your models here.


class Course(models.Model):
    # id Automatic Field
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    courseName = models.CharField(max_length=50)
    courseDescription = models.CharField(max_length=300)
    coursePrice = models.FloatField()
    courseReviewScore = models.FloatField(blank=True)
    courseType = models.CharField(max_length=50)
    courseImage = models.ImageField(
        default="default.jpg", upload_to="course_images", blank=True, null=True
    )
    courseLessons = models.IntegerField(default=0)
    courseHours = models.FloatField(default=0)
    courseDate = models.DateField(default=timezone.now, null=True)
    reviews = models.ManyToManyField(reviewModel.StudentReviewCourse, related_name='studcoursereviews', blank=True)

    def __str__(self):
        return f"{self.courseName}"
    
    
    
class Requirement(models.Model):
    #id Automatic Field
    courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
    requirementDescription=models.CharField(max_length=50)

class WhatYoullLearn(models.Model):
    #id Automatic Field
    courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
    whatYoullLearnDescription=models.CharField(max_length=50)    
    
    
    


class Section(models.Model):
    # id Automatic Field
    courseID = models.ForeignKey(Course, on_delete=models.CASCADE)
    sectionName = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.sectionName}"


class Question(models.Model):
    # id Automatic Field
    sectionID = models.ForeignKey(Section, on_delete=models.CASCADE)
    questionHead = models.CharField(max_length=50)
    questionAnswer = models.CharField(max_length=50)
    questionImage = models.ImageField(blank=True)

    def __str__(self):
        return f"{self.questionHead}"


class Answer(models.Model):
    # id Automatic Field
    questionID = models.ForeignKey(Question, on_delete=models.CASCADE)
    answerText = models.CharField(max_length=50)
    isAnswer = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.answerText} : {self.isAnswer}"


class Video(models.Model):
    # id Automatic Field
    sectionID = models.ForeignKey(Section, on_delete=models.CASCADE)
    videoTitle = models.CharField(max_length=50)
    videoDescription = models.CharField(max_length=300)
    videoLink = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.videoTitle} : {self.videoDescription}"
