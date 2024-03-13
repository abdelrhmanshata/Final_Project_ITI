from django.urls import path
from . import views

urlpatterns = [
    # Courses

    path('listAllCourses/', views.listAllCourses, name='listAllCourses'),
    path('listAllCourses/<int:courseID>', views.getACourse, name='getACourse'),
    path('addACourse/', views.addACourse, name="addACourse"),
    path('updateACourse/', views.updateACourse, name="updateACourse"),
    path('deleteACourse/<int:courseID>', views.deleteACourse, name="deleteACourse"),

    # Sections

    path('course/<int:courseID>/sections/all/', views.getAllSections, name="getAllSections"),
    path('course/<int:courseID>/<int:sectionID>/', views.getASection, name="getASection"),
    path('course/<int:courseID>/addASection/', views.addASection, name="addASection"),
    path('course/<int:courseID>/updateASection/', views.updateASection, name="updateASection"),
    path('course/<int:courseID>/deleteASection/<int:sectionID>/', views.deleteASection, name="deleteASection"),

    # Videos

    path('section/<int:sectionID>/getAllVideos/', views.getAllVideos, name="getAllVideos"),
    path('section/<int:sectionID>/addAVideo/', views.addAVideo, name="addAVideo"),
    path('section/<int:sectionID>/deleteAVideo/<int:videoID>', views.deleteAVideo, name="deleteAVideo"),
    path('section/<int:sectionID>/updateAVideo/<int:videoID>', views.updateAVideo, name="updateAVideo"),

    # Questions

    path('section/<int:sectionID>/questions/all/', views.getAllQuestions, name="getAllQuestions"),
    path('section/<int:sectionID>/questions/<int:questionID>/', views.getAQuestion, name="getAQuestion"),
    path('section/<int:sectionID>/addAQuestion/', views.addAQuestion, name="addAQuestion"),
    path('section/<int:sectionID>/updateAQuestion/', views.updateAQuestion, name="updateAQuestion"),
    path('section/<int:sectionID>/deleteAQuestion/', views.deleteAQuestion, name="deleteAQuestion"),

    # Answers
 
    path('section/<int:sectionID>/<int:questionID>/addAnAnswer/', views.addAnAnswer, name="addAnAnswer"),
    path('section/<int:sectionID>/<int:questionID>/getAllAnswers/', views.getAllAnswers, name="getAllAnswers"),
    path('section/<int:sectionID>/<int:questionID>/answerAQuestion/', views.answerAQuestion, name="answerAQuestion"),

    # Requirements
    
    path('course/<int:courseID>/addARequirement/', views.addARequirement, name="addARequirement"),
    path('course/<int:courseID>/getAllRequirements/', views.getAllRequirements, name="getAllRequirements"),
    path('course/<int:courseID>/updateARequirement/', views.updateARequirement, name="updateARequirement"),
    path('course/<int:courseID>/deleteARequirement/<int:requirementID>', views.deleteARequirement, name="deleteARequirement"),

    # WhatYoullLearn

    path('course/<int:courseID>/addAWhatYoullLearn/', views.addAWhatYoullLearn, name="addAWhatYoullLearn"),
    path('course/<int:courseID>/getAllWhatYoullLearns/', views.getAllWhatYoullLearns, name="getAllWhatYoullLearns"),
    path('course/<int:courseID>/updateAWhatYoullLearn/', views.updateAWhatYoullLearn, name="updateAWhatYoullLearn"),
    path('course/<int:courseID>/deleteAWhatYoullLearn/<int:WhatYoullLearnID>', views.deleteAWhatYoullLearn, name="deleteAWhatYoullLearn"),


]