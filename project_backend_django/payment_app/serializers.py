from rest_framework import serializers
from .models import Course


class CourseSerialzer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields='__all__'