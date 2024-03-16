from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from django.http import HttpResponse
from .models import *
from .serializers import *
from django.views.static import serve
from django.conf import settings
from reviews.models import StudentReviewCourse
from reviews.serializers import StudentReviewCourseSerializer

# Create your views here.


# Courses


@api_view(["GET"])
def listAllCourses(request):
    data = Course.objects.all()
    datajson = CourseSerializer(data, many=True).data
    return Response({"message": datajson})


@api_view(["GET"])
def listCategoryCourses(request, type):
    data = Course.objects.filter(courseType=type)
    datajson = CourseSerializer(data, many=True).data
    return Response({"message": datajson})


def getImage(request, courseID):
    course = Course.objects.get(id=courseID)
    image_path = settings.MEDIA_ROOT + course.courseImage.name
    return serve(request, image_path, document_root=settings.MEDIA_ROOT)


@api_view(["GET"])
def getAllCoursesByTeacher(request, teacherID):
    data = Course.objects.filter(userID=teacherID)
    if data:
        datajson = data.count()
        print(datajson)
        return Response({"message": datajson})
    return Response({"message": "Requirements Not Found."})


@api_view(["POST"])
def addACourse(request):
    user_id = request.data.get("userID")
    user = User.objects.get(id=user_id)
    obj = CourseAddSerializer(data=request.data, context={"user": user})
    obj.courseReviewScore = 0
    obj.courseImage = request.FILES.get("courseImage")
    obj.userID = user
    if obj.is_valid():
        obj.save()
        return Response({"message": "Course added."})
    print("Error:", obj.errors)
    return Response({"message": "Course not added. Data might be invalid."})


@api_view(["GET"])
def getACourse(request, courseID):
    data = Course.objects.filter(id=courseID)
    if data:
        datajson = CourseSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})


from user_authentication_app.models import *
from user_authentication_app.serializers import *
from django.shortcuts import get_object_or_404


class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Retrieve associated reviews for the course
        reviews = StudentReviewCourse.objects.filter(courseID=instance.id)
        review_serializer = StudentReviewCourseSerializer(reviews, many=True)

        user = get_object_or_404(User, id=instance.userID.id)
        teacher_serializer = UserSerializer(user)

        # Add reviews to the serialized course data
        data = serializer.data
        data["reviews"] = review_serializer.data
        data["teacher"] = teacher_serializer.data

        return Response(data)


@api_view(["GET"])
def getTeacherCourse(request, teacherID):
    data = Course.objects.filter(userID=teacherID)
    if data:
        datajson = CourseSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})


@api_view(["PUT"])
def updateACourse(request, courseID):
    try:
        selectedCourse = Course.objects.get(id=courseID)
        data = request.data.copy()  # Create a copy of request data

        # Check if the 'courseImage' key exists in request data and if it's a file
        if "courseImage" in data and hasattr(data["courseImage"], "file"):
            datajson = CourseAddSerializer(
                instance=selectedCourse, data=data, partial=True
            )
        else:
            # Remove the 'courseImage' key from request data if it's not a file
            data.pop("courseImage", None)
            datajson = CourseAddSerializer(
                instance=selectedCourse, data=data, partial=True
            )

        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated the course."})
        else:
            print("Error : ", datajson.errors)
            return Response({"message": "Invalid data.", "errors": datajson.errors})
    except Course.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["GET"])
def deleteACourse(request, courseID):
    try:
        selectedCourse = Course.objects.get(id=courseID)
        selectedCourse.delete()
        return Response({"message": "Successfully deleted."})
    except Course.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["POST"])
def addARequirement(request, courseID):
    course = Course.objects.get(id=courseID)
    obj = RequirementAddSerializer(data=request.data, context={"course": course})
    obj.courseID = course
    print(obj)
    if obj.is_valid():
        obj.save()
        return Response({"message": "Requirement added."})
    return Response({"message": "Requirement not added. Data might be invalid."})


@api_view(["GET"])
def getAllRequirements(request, courseID):
    data = Requirement.objects.filter(courseID=courseID)
    if data:
        datajson = RequirementSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Requirements Not Found."})


@api_view(["POST", "GET", "PUT"])
def updateARequirement(request):
    try:
        requirementID = request.data["requirementID"]
        selectedRequirement = Requirement.objects.get(id=requirementID)
        datajson = RequirementAddSerializer(selectedRequirement, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated the requirement."})
    except Requirement.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["POST", "GET", "DELETE"])
def deleteARequirement(request, requirementID):
    try:
        selectedRequirement = Requirement.objects.get(id=requirementID)
        selectedRequirement.delete()
        return Response({"message": "Successfully deleted."})
    except Requirement.DoesNotExist:
        return Response({"message": "Not Found."})


# WhatYoullLearn


@api_view(["POST"])
def addAWhatYoullLearn(request, courseID):
    course = Course.objects.get(id=courseID)
    obj = WhatYoullLearnAddSerializer(data=request.data, context={"course": course})
    obj.courseID = course
    # obj = WhatYoullLearnAddSerializer(data=request.data)
    print(obj)
    if obj.is_valid():
        obj.save()
        return Response({"message": "What You'll Learn added."})
    print(obj.errors)
    return Response({"message": "What You'll Learn not added. Data might be invalid."})


@api_view(["GET"])
def getAllWhatYoullLearns(request, courseID):
    data = WhatYoullLearn.objects.filter(courseID=courseID)
    print(data)
    if data:
        datajson = WhatYoullLearnSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "WhatYoullLearns Not Found."})


@api_view(["POST", "GET", "PUT"])
def updateAWhatYoullLearn(request):
    try:
        whatYoullLearnID = request.data["WhatYoullLearnID"]
        selectedWhatYoullLearn = WhatYoullLearn.objects.get(id=whatYoullLearnID)
        datajson = WhatYoullLearnAddSerializer(
            selectedWhatYoullLearn, data=request.data
        )
        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated."})
    except WhatYoullLearn.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["POST", "GET", "DELETE"])
def deleteAWhatYoullLearn(request, whatYoullLearnID):
    try:
        selectedWhatYoullLearn = WhatYoullLearn.objects.get(id=whatYoullLearnID)
        selectedWhatYoullLearn.delete()
        return Response({"message": "Successfully deleted."})
    except WhatYoullLearn.DoesNotExist:
        return Response({"message": "Not Found."})


# Videos


@api_view(["POST"])
def addAVideo(request, sectionID):
    section = Section.objects.get(id=sectionID)
    obj = VideoAddSerializer(data=request.data)
    obj.videoTitle = request.data.get("videoTitle")
    obj.videoDescription = request.data.get("videoDescription")
    obj.videoLink = request.data.get("videoLink")
    obj.sectionID = section
    print(obj)
    if obj.is_valid():
        obj.save()
        return Response({"message": "Video added."})

    print(obj.errors)
    return Response(
        {"message": "Video not added. Data might be invalid." + str(obj.errors)}
    )


@api_view(["GET"])
def getAllVideos(request, sectionID):
    data = Video.objects.filter(sectionID=sectionID)
    if data:
        datajson = VideoGetSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Video Not Found."})


@api_view(["PUT"])
def updateAVideo(request, videoID):
    try:
        selectedVideo = Video.objects.get(id=videoID)
        datajson = VideoAddSerializer(selectedVideo, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated the video."})
    except Course.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["POST", "GET", "DELETE"])
def deleteAVideo(request, videoID):
    try:
        selectedVideo = Video.objects.get(id=videoID)
        selectedVideo.delete()
        return Response({"message": "Successfully deleted."})
    except Video.DoesNotExist:
        return Response({"message": "Not Found."})


# Sections


@api_view(["POST"])
def addASection(request, courseID):
    course = Course.objects.get(id=courseID)
    obj = SectionAddSerializer(data=request.data, context={"courseID": course})
    obj.courseID = course
    obj.sectionName = request.data.get("sectionName")
    if obj.is_valid():
        obj.save()
        return Response({"message": "Section added."})
    return Response({"message": "Section not added. Data might be invalid."})


@api_view(["GET"])
def getASection(request, sectionID):
    data = Section.objects.filter(id=sectionID)
    if data:
        datajson = SectionSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})


@api_view(["GET"])
def getAllSections(request, courseID):
    data = Section.objects.filter(courseID=courseID)
    print(data)
    if data:
        datajson = SectionGetSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Section Not Found."})


@api_view(["PUT"])
def updateASection(request, sectionID):
    try:
        selectedSection = Section.objects.get(id=sectionID)
        datajson = SectionAddSerializer(selectedSection, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated Section."})
    except Section.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["GET"])
def deleteASection(request, sectionID):
    try:
        selectedSection = Section.objects.get(id=sectionID)
        selectedSection.delete()
        return Response({"message": "Successfully deleted."})
    except Section.DoesNotExist:
        return Response({"message": "Not Found."})


# Questions


@api_view(["POST"])
def addAQuestion(request, courseID):
    course = Course.objects.get(id=courseID)
    obj = QuestionAddSerializer(data=request.data, context={"courseID": course})
    obj.courseID = course
    obj.questionHead = request.data.get("questionHead")
    if obj.is_valid():
        obj.save()
        return Response({"message": "Question added."})
    return Response({"message": "Question not added. Data might be invalid."})


@api_view(["GET"])
def getAllQuestions(request, courseID):
    data = Question.objects.filter(courseID=courseID)
    questionDataJson = QuestionGetSerializer(data, many=True).data
    listQuestion = []
    for question in questionDataJson:
        answers = Answer.objects.filter(questionID=question["id"])
        answerDataJson = AnswerGetSerializer(answers, many=True).data
        obj = {"question": question, "answers": answerDataJson}
        listQuestion.append(obj)

    if listQuestion:
        return Response({"message": listQuestion})
    return Response({"message": "Questions Not Found."})


@api_view(["GET"])
def getAQuestion(request, questionID):
    data = Course.objects.filter(id=questionID)
    if data:
        datajson = QuestionSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})


@api_view(["POST", "GET", "PUT"])
def updateAQuestion(request):
    try:
        questionID = request.data["questionID"]
        selectedQuestion = Question.objects.get(id=questionID)
        datajson = QuestionAddSerializer(selectedQuestion, data=request.data)
        if datajson.is_valid():
            datajson.save()
            return Response({"message": "Successfully updated the video."})
    except Section.DoesNotExist:
        return Response({"message": "Not Found."})


@api_view(["DELETE"])
def deleteAQuestion(request, questionID):
    try:
        selectedQuestion = Question.objects.get(id=questionID)
        selectedQuestion.delete()
        return Response({"message": "Successfully deleted."})
    except Section.DoesNotExist:
        return Response({"message": "Not Found."})


# Answers


@api_view(["POST"])
def addAnAnswer(request, questionID):
    question = Question.objects.get(id=questionID)
    obj = AnswerAddSerializer(data=request.data, context={"questionID": question})
    obj.questionID = question
    if obj.is_valid():
        obj.save()
        return Response({"message": "Answer added."})
    return Response({"message": "Answer not added. Data might be invalid."})


@api_view(["GET"])
def getAllAnswers(request, questionID):
    data = Answer.objects.filter(questionID=questionID)
    print(data)
    if data:
        datajson = AnswerGetSerializer(data, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Video Not Found."})


@api_view(["DELETE"])
def deleteAnswer(request, answerID):
    try:
        selectedAnswer = Answer.objects.get(id=answerID)
        selectedAnswer.delete()
        return Response({"message": "Successfully deleted."})
    except Section.DoesNotExist:
        return Response({"message": "Not Found."})
