from rest_framework import serializers
from courseListAPI.models import Course
from .models import Payment_Course


class CourseSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class PaymentSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Payment_Course
        fields = "__all__"
