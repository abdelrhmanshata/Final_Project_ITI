from rest_framework import serializers
from .models import *
from user_authentication_app.serializers import UserSerializer

from user_authentication_app.models import User

# from courseListAPI.serializers import CourseSerializer
from courseListAPI.models import Course
class StudentReviewCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentReviewCourse
        fields = "__all__"


class StudentReviewTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentReviewTeacher
        fields = '__all__'


class StudentEnrollsInCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentEnrollsInCourse
        fields = "__all__"

    # def create(self, validated_data):
    #     return StudentEnrollsInCourse.objects.create(**validated_data)


class ApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approval
        fields = '__all__'
