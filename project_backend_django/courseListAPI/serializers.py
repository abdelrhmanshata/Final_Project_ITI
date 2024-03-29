from rest_framework import serializers
from .models import *
from user_authentication_app.models import *
from reviews.serializers import StudentReviewCourseSerializer
from reviews.models import StudentReviewCourse

# Course


# class CourseSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     userID = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
#     courseName = serializers.CharField(max_length=50)
#     courseDescription = serializers.CharField(max_length=300)
#     coursePrice = serializers.FloatField()
#     courseReviewScore = serializers.FloatField()
#     courseType = serializers.CharField(max_length=50)
#     courseImage = serializers.ImageField()
#     courseLessons = serializers.IntegerField()
#     courseHours = serializers.FloatField()
#     courseDate = serializers.DateField()


class CourseSerializer(serializers.ModelSerializer):
    # reviews = StudentReviewCourseSerializer(many=True, read_only=True)
    
    reviews = serializers.SerializerMethodField(
        method_name="get_reviews", read_only=True
    )

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = StudentReviewCourseSerializer(reviews, many=True)
        return serializer.data

    class Meta:
        model = Course
        fields = "__all__"


class CourseAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        extra_kwargs = {"courseImage": {"required": False}}


class RequirementSerializer(serializers.Serializer):
    # id Automatic Field
    # courseID=serializers.IntegerField()
    id = serializers.IntegerField()
    requirementDescription = serializers.CharField(max_length=50)


class RequirementAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = "__all__"


# What you'll learn


class WhatYoullLearnSerializer(serializers.Serializer):
    # id Automatic Field
    # courseID=serializers.IntegerField()
    id = serializers.IntegerField()
    whatYoullLearnDescription = serializers.CharField(max_length=50)


class WhatYoullLearnAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatYoullLearn
        fields = "__all__"


# Video


class VideoSerializer(serializers.Serializer):
    # id Automatic Field
    courseID = serializers.IntegerField()
    videoTitle = serializers.CharField(max_length=50)
    videoDescription = serializers.CharField(max_length=300)
    videoLink = serializers.CharField(max_length=50)


class VideoAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"


class VideoGetSerializer(serializers.Serializer):
    # id Automatic Field
    id = serializers.IntegerField()
    sectionID = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    videoTitle = serializers.CharField(max_length=50)
    videoDescription = serializers.CharField(max_length=300)
    videoLink = serializers.CharField(max_length=50)


# Section


class SectionSerializer(serializers.Serializer):
    # id Automatic Field
    courseID = serializers.IntegerField()
    sectionName = serializers.CharField(max_length=50)


class SectionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"


class SectionGetSerializer(serializers.Serializer):
    # id Automatic Field
    id = serializers.IntegerField()
    courseID = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    sectionName = serializers.CharField(max_length=50)


# Question


class QuestionSerializer(serializers.Serializer):
    # id Automatic Field
    sectionID = serializers.IntegerField()
    questionHead = serializers.CharField(max_length=50)
    # questionAnswer = serializers.CharField(max_length=50)
    # questionImage = serializers.ImageField()


class QuestionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuestionGetSerializer(serializers.Serializer):
    # id Automatic Field
    id = serializers.IntegerField()
    questionHead = serializers.CharField(max_length=50)
    # questionAnswer = serializers.CharField(max_length=50)
    # questionImage = serializers.ImageField()


# Answer


class AnswerSerializer(serializers.Serializer):
    # id Automatic Field
    questionID = serializers.IntegerField()
    answerText = serializers.CharField(max_length=50)
    isAnswer = serializers.BooleanField()


class AnswerAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class AnswerGetSerializer(serializers.Serializer):
    # id Automatic Field
    id = serializers.IntegerField()
    # questionID = serializers.IntegerField()
    answerText = serializers.CharField(max_length=50)
    isAnswer = serializers.BooleanField()
