from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import *
from .serializers import *
from reviews.models import StudentReviewCourse
from reviews.serializers import StudentReviewCourseSerializer


# Create your views here.

# Courses

@api_view(['GET'])
def listAllCourses(request):
    data = Course.objects.all()
    datajson = CourseSerializer(data, many=True).data
    return Response({"message": datajson})


@api_view(['POST'])
def addACourse(request):
    obj = CourseAddSerializer(data=request.data)
    obj.initial_data['courseReviewScore'] = 0  # Assign initial value for courseReviewScore
    course_image = request.FILES.get('courseImage')  # Access uploaded file
    obj.initial_data['courseImage'] = course_image  # Assign uploaded file to courseImage field
    print(obj)
    if obj.is_valid():
        obj.save()
        return Response({'message': "Course added."})
    return Response({'message': "Course not added. Data might be invalid."})


@api_view(['GET'])
def getACourse(request, courseID):
    data = Course.objects.filter(id=courseID)
    if (data):
        datajson = CourseSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Course Not Found."})


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Retrieve associated reviews for the course
        reviews = StudentReviewCourse.objects.filter(courseID=instance.id)
        review_serializer = StudentReviewCourseSerializer(reviews, many=True)

        # Add reviews to the serialized course data
        data = serializer.data
        data['reviews'] = review_serializer.data

        return Response(data)
    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #
    #     queryset = queryset.prefetch_related('reviews')  # Prefetch related reviews
    #     return queryset

@api_view(['POST', 'GET', 'PUT'])
def updateACourse(request):
    try:
        print(request.data["courseID"])
        courseID = request.data["courseID"]
        selectedCourse = Course.objects.get(id=courseID)
        datajson = CourseAddSerializer(selectedCourse, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message': "Successfully updated the course."})
    except Course.DoesNotExist:
        return Response({'message': "Not Found."})


@api_view(['POST', 'GET', 'DELETE'])
def deleteACourse(request, courseID):
    try:
        selectedCourse = Course.objects.get(id=courseID)
        selectedCourse.delete()
        return Response({'message': "Successfully deleted."})
    except Course.DoesNotExist:
        return Response({'message': "Not Found."})


# Videos

@api_view(['POST'])
def addAVideo(request):
    obj = VideoAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message': "Video added."})
    return Response({'message': "Video not added. Data might be invalid."})


@api_view(['GET'])
def getAllVideos(request, courseID):
    data = Video.objects.filter(courseID=courseID)
    print(data)
    if (data):
        datajson = VideoGetSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Video Not Found."})


@api_view(['POST', 'GET', 'PUT'])
def updateAVideo(request):
    try:
        videoID = request.data["videoID"]
        selectedVideo = Video.objects.get(id=videoID)
        datajson = VideoAddSerializer(selectedVideo, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message': "Successfully updated the video."})
    except Course.DoesNotExist:
        return Response({'message': "Not Found."})


@api_view(['POST', 'GET', 'DELETE'])
def deleteAVideo(request, courseID, videoID):
    try:
        selectedVideo = Video.objects.get(id=videoID)
        selectedVideo.delete()
        return Response({'message': "Successfully deleted."})
    except Video.DoesNotExist:
        return Response({'message': "Not Found."})


# Sections

@api_view(['POST'])
def addASection(request):
    obj = SectionAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message': "Section added."})
    return Response({'message': "Section not added. Data might be invalid."})


@api_view(['GET'])
def getASection(request, sectionID):
    data = Section.objects.filter(id=sectionID)
    if (data):
        datajson = SectionSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Course Not Found."})


@api_view(['GET'])
def getAllSections(request, courseID):
    data = Section.objects.filter(courseID=courseID)
    print(data)
    if (data):
        datajson = SectionGetSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Video Not Found."})


@api_view(['POST', 'GET', 'PUT'])
def updateASection(request):
    try:
        sectionID = request.data["videoID"]
        selectedSection = Section.objects.get(id=sectionID)
        datajson = SectionAddSerializer(selectedSection, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message': "Successfully updated the video."})
    except Section.DoesNotExist:
        return Response({'message': "Not Found."})


@api_view(['POST', 'GET', 'DELETE'])
def deleteASection(request, courseID, sectionID):
    try:
        selectedSection = Section.objects.get(id=sectionID)
        selectedSection.delete()
        return Response({'message': "Successfully deleted."})
    except Section.DoesNotExist:
        return Response({'message': "Not Found."})


# Questions

@api_view(['POST'])
def addAQuestion(request):
    obj = QuestionAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message': "Question added."})
    return Response({'message': "Question not added. Data might be invalid."})


@api_view(['GET'])
def getAllQuestions(request, courseID):
    data = Question.objects.filter(courseID=courseID)
    print(data)
    if (data):
        datajson = QuestionGetSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Video Not Found."})


@api_view(['GET'])
def getAQuestion(request, questionID):
    data = Course.objects.filter(id=questionID)
    if (data):
        datajson = QuestionSerializer(data, many=True).data
        return Response({'message': datajson})
    return Response({'message': "Course Not Found."})


@api_view(['POST', 'GET', 'PUT'])
def updateAQuestion(request):
    try:
        questionID = request.data["questionID"]
        selectedQuestion = Question.objects.get(id=questionID)
        datajson = QuestionAddSerializer(selectedQuestion, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message': "Successfully updated the video."})
    except Section.DoesNotExist:
        return Response({'message': "Not Found."})


@api_view(['POST', 'GET', 'DELETE'])
def deleteAQuestion(request, courseID, questionID):
    try:
        selectedQuestion = Question.objects.get(id=questionID)
        selectedQuestion.delete()
        return Response({'message': "Successfully deleted."})
    except Section.DoesNotExist:
        return Response({'message': "Not Found."})


