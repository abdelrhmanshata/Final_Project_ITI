from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .models import *
from .serializers import *

# Create your views here.

# Courses

@api_view(['GET'])
def listAllCourses(request):
    data = Course.objects.all()
    datajson=CourseSerializer(data,many=True).data
    return Response({"message":datajson})

@api_view(['POST'])
def addACourse(request):
    obj=CourseAddSerializer(data=request.data)
    obj.courseReviewScore = 0
    obj.courseImage=request.getFiles()
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Course added."})
    return Response({'message':"Course not added. Data might be invalid."})

@api_view(['GET'])
def getACourse(request, courseID):
    data=Course.objects.filter(id=courseID)
    if (data):
        datajson=CourseSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Course Not Found."})

@api_view(['POST','GET','PUT'])
def updateACourse(request):
    try:
        print(request.data["courseID"])
        courseID=request.data["courseID"]
        selectedCourse=Course.objects.get(id=courseID)
        datajson=CourseAddSerializer(selectedCourse, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated the course."})
    except Course.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteACourse(request, courseID):
    try:
        selectedCourse=Course.objects.get(id=courseID)
        selectedCourse.delete()
        return Response({'message':"Successfully deleted."})
    except Course.DoesNotExist:
        return Response({'message':"Not Found."})
       
# Videos

@api_view(['POST'])
def addAVideo(request):
    obj=VideoAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Video added."})
    return Response({'message':"Video not added. Data might be invalid."})

@api_view(['GET'])
def getAllVideos(request, courseID):
    data=Video.objects.filter(courseID=courseID)
    print(data)
    if (data):
        datajson=VideoGetSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Video Not Found."})

@api_view(['POST','GET','PUT'])
def updateAVideo(request):
    try:
        videoID=request.data["videoID"]
        selectedVideo=Video.objects.get(id=videoID)
        datajson=VideoAddSerializer(selectedVideo, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated the video."})
    except Course.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteAVideo(request, courseID, videoID):
    try:
        selectedVideo=Video.objects.get(id=videoID)
        selectedVideo.delete()
        return Response({'message':"Successfully deleted."})
    except Video.DoesNotExist:
        return Response({'message':"Not Found."})
    
# Sections
    
@api_view(['POST'])
def addASection(request, courseID):
    obj=SectionAddSerializer(data=request.data)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Section added."})
    return Response({'message':"Section not added. Data might be invalid."})

@api_view(['GET'])
def getASection(request, sectionID):
    data=Section.objects.filter(id=sectionID)
    if (data):
        datajson=SectionSerializer(data, many=True).data
        return Response({'message':datajson})
    return Response({'message':"Course Not Found."})

@api_view(['GET'])
def getAllSections(request, courseID):
    data=Section.objects.all()
    if (data):
        datajson=SectionGetSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Video Not Found."})

@api_view(['POST','GET','PUT'])
def updateASection(request):
    try:
        sectionID=request.data["videoID"]
        selectedSection=Section.objects.get(id=sectionID)
        datajson=SectionAddSerializer(selectedSection, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated the video."})
    except Section.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteASection(request, courseID, sectionID):
    try:
        selectedSection=Section.objects.get(id=sectionID)
        selectedSection.delete()
        return Response({'message':"Successfully deleted."})
    except Section.DoesNotExist:
        return Response({'message':"Not Found."})
    

# Questions
    
@api_view(['POST'])
def addAQuestion(request, sectionID):
    obj=QuestionAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Question added."})
    return Response({'message':"Question not added. Data might be invalid."})

@api_view(['GET'])
def getAllQuestions(request, sectionID):
    data=Question.objects.filter(sectionID=sectionID)
    print(data)
    if (data):
        datajson=QuestionGetSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Video Not Found."})

@api_view(['GET'])
def getAQuestion(request, questionID, sectionID):
    data=Question.objects.filter(id=questionID)
    print(data)
    if (data):
        datajson=QuestionSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Course Not Found."})

@api_view(['POST','GET','PUT'])
def updateAQuestion(request):
    try:
        questionID=request.data["questionID"]
        selectedQuestion=Question.objects.get(id=questionID)
        datajson=QuestionAddSerializer(selectedQuestion, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated the video."})
    except Question.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteAQuestion(request, courseID, questionID):
    try:
        selectedQuestion=Question.objects.get(id=questionID)
        selectedQuestion.delete()
        return Response({'message':"Successfully deleted."})
    except Section.DoesNotExist:
        return Response({'message':"Not Found."})
    
# Answers
    
@api_view(['POST'])
def addAnAnswer(request, sectionID, questionID):
    obj=AnswerAddSerializer(data=request.data)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Answer added."})
    return Response({'message':"Answer not added. Data might be invalid."})

@api_view(['GET'])
def getAllAnswers(request, sectionID, questionID):
    data=Answer.objects.filter(questionID=questionID)
    print("answers", data)
    if (data):
        datajson=AnswerGetSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"Video Not Found."})

@api_view(['POST'])
def answerAQuestion(request, sectionID, questionID):
    obj=UserAnswerAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Answer added."})
    return Response({'message':"Answer not added. Data might be invalid."})

# Requirements

@api_view(['POST'])
def addARequirement(request, courseID):
    obj=RequirementAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"Requirement added."})
    return Response({'message':"Requirement not added. Data might be invalid."})

@api_view(['GET'])
def getAllRequirements(request, courseID):
    data=Requirement.objects.filter(courseID=courseID)
    if (data):
        datajson=RequirementSerializer(data, many=True).data
        return Response({'message':datajson})
    return Response({'message':"Requirements Not Found."})

@api_view(['POST','GET','PUT'])
def updateARequirement(request):
    try:
        requirementID=request.data["requirementID"]
        selectedRequirement=Requirement.objects.get(id=requirementID)
        datajson=RequirementAddSerializer(selectedRequirement, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated the requirement."})
    except Requirement.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteARequirement(request, requirementID):
    try:
        selectedRequirement=Requirement.objects.get(id=requirementID)
        selectedRequirement.delete()
        return Response({'message':"Successfully deleted."})
    except Requirement.DoesNotExist:
        return Response({'message':"Not Found."})
    
# WhatYoullLearn

@api_view(['POST'])
def addAWhatYoullLearn(request):
    obj=WhatYoullLearnAddSerializer(data=request.data)
    print(obj)
    if (obj.is_valid()):
        obj.save()
        return Response({'message':"What You'll Learn added."})
    return Response({'message':"What You'll Learn not added. Data might be invalid."})

@api_view(['GET'])
def getAllWhatYoullLearns(request, courseID):
    data=WhatYoullLearn.objects.filter(courseID=courseID)
    print(data)
    if (data):
        datajson=WhatYoullLearnGetSerializer(data,many=True).data
        return Response({'message':datajson})
    return Response({'message':"WhatYoullLearns Not Found."})

@api_view(['POST','GET','PUT'])
def updateAWhatYoullLearn(request):
    try:
        whatYoullLearnID=request.data["WhatYoullLearnID"]
        selectedWhatYoullLearn=WhatYoullLearn.objects.get(id=whatYoullLearnID)
        datajson=WhatYoullLearnAddSerializer(selectedWhatYoullLearn, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({'message':"Successfully updated."})
    except WhatYoullLearn.DoesNotExist:
        return Response({'message':"Not Found."})

@api_view(['POST','GET','DELETE'])
def deleteAWhatYoullLearn(request, whatYoullLearnID):
    try:
        selectedWhatYoullLearn=WhatYoullLearn.objects.get(id=whatYoullLearnID)
        selectedWhatYoullLearn.delete()
        return Response({'message':"Successfully deleted."})
    except WhatYoullLearn.DoesNotExist:
        return Response({'message':"Not Found."})
    
# Teacher ID Find
    
@api_view(['GET'])
def getAllCoursesByTeacher(request, teacherID):
    data=Course.objects.filter(userID=teacherID)
    if (data):
        datajson=data.count()
        print(datajson)
        return Response({'message':datajson})
    return Response({'message':"Requirements Not Found."})
