from django.db import models

# Create your models here.

class Course(models.Model):
    #id Automatic Field
    #userID=models.ForeignKey(User, on_delete=models.CASCADE)
    courseName=models.CharField(max_length=50)
    courseDescription=models.CharField(max_length=300)
    coursePrice=models.FloatField()
    courseReviewScore=models.FloatField()
    courseType=models.CharField(max_length=50)
    courseImage=models.ImageField(upload_to="course_images", null=True, default="testImage.png", blank=True)

class Section(models.Model):
    #id Automatic Field
    courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
    sectionName=models.CharField(max_length=50)

class Question(models.Model):
    #id Automatic Field
    sectionID=models.ForeignKey(Section, on_delete=models.CASCADE)
    questionHead=models.CharField(max_length=50)
    questionAnswer=models.CharField(max_length=50)
    questionImage=models.ImageField(blank=True)

class Answer(models.Model):
    #id Automatic Field
    questionID=models.ForeignKey(Question, on_delete=models.CASCADE)
    answerText=models.CharField(max_length=50)
    isAnswer=models.BooleanField(default=False)

    #   Boolean False
    #   Boolean False
    #   Boolean False
    #   Boolean True

class Video(models.Model):
    #id Automatic Field
    sectionID=models.ForeignKey(Section, on_delete=models.CASCADE)
    videoTitle=models.CharField(max_length=50)
    videoDescription=models.CharField(max_length=300)
    videoLink=models.CharField(max_length=50)

class Requirement(models.Model):
    #id Automatic Field
    courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
    requirementDescription=models.CharField(max_length=50)

class WhatYoullLearn(models.Model):
    #id Automatic Field
    courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
    whatYoullLearnDescription=models.CharField(max_length=50)


# class PaymentMethod(models.Model):
#     #id Automatic Field
#     courseID=models.ForeignKey(Course, on_delete=models.CASCADE)
#     # userID=models.ForeignKey(User, on_delete=models.CASCADE)
#     paymentAmount=models.FloatField()
#     paymentDate=models.DateTimeField()
