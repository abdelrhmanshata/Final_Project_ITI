from rest_framework import serializers
from .models import *
from reviews.serializers import StudentReviewCourseSerializer
from reviews.models import StudentReviewCourse

# class CourseSerializer(serializers.Serializer):
#     courseName=serializers.CharField(max_length=50)
#     courseDescription=serializers.CharField(max_length=300)
#     coursePrice=serializers.FloatField()
#     courseReviewScore=serializers.FloatField()
#     courseType=serializers.CharField(max_length=50)
#     courseImage=serializers.ImageField()
#     # reviews = serializers.SerializerMethodField(method_name='get_course_reviews', read_only=True)
#     reviews= StudentReviewCourseSerializer(many=True, read_only=True)
#
#     # class Meta:
#     #     model = StudentReviewCourse
#     #     fields = ['reviewText', 'courseReviewScore']
#     # def get_course_reviews(self, obj):
#     #     reviews = obj.reviews.all() if hasattr(obj, 'reviews') else []
#     #     serializer = StudentReviewCourseSerializer(reviews, many=True)
#     #     return serializer.data
#
#     class Meta:
#         model = Course
#         fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    # reviews = StudentReviewCourseSerializer(many=True, read_only=True)
    reviews = serializers.SerializerMethodField(method_name='get_reviews', read_only=True)

    def get_reviews(self, obj):
        reviews = obj.reviews.all()
        serializer = StudentReviewCourseSerializer(reviews, many=True)
        return serializer.data
    class Meta:
        model = Course
        fields = '__all__'
class CourseAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields='__all__'



class VideoSerializer(serializers.Serializer):
    #id Automatic Field
    courseID=serializers.IntegerField()
    videoTitle=serializers.CharField(max_length=50)
    videoDescription=serializers.CharField(max_length=300)
    videoLink=serializers.CharField(max_length=50)

class VideoAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=Video
        fields='__all__'

class VideoGetSerializer(serializers.Serializer):
    #id Automatic Field
    videoTitle=serializers.CharField(max_length=50)
    videoDescription=serializers.CharField(max_length=300)
    videoLink=serializers.CharField(max_length=50)



class SectionSerializer(serializers.Serializer):
    #id Automatic Field
    courseID=serializers.IntegerField()
    sectionName=serializers.CharField(max_length=50)

class SectionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=Section
        fields='__all__'

class SectionGetSerializer(serializers.Serializer):
    #id Automatic Field
    sectionName=serializers.CharField(max_length=50)



class QuestionSerializer(serializers.Serializer):
    #id Automatic Field
    sectionID=serializers.IntegerField()
    questionHead=serializers.CharField(max_length=50)
    questionAnswer=serializers.CharField(max_length=50)
    questionImage=serializers.ImageField()

class QuestionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields='__all__'

class QuestionGetSerializer(serializers.Serializer):
    #id Automatic Field
    questionHead=serializers.CharField(max_length=50)
    questionAnswer=serializers.CharField(max_length=50)
    questionImage=serializers.ImageField()