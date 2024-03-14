from django.urls import path
from . import views

urlpatterns = [
    path('listAllCourses/', views.listAllCourses, name='listAllCourses'),
    path('listAllCourses/<int:courseID>', views.getACourse, name='getACourse'),
    path('addACourse/', views.addACourse, name="addACourse"),
    path('updateACourse/', views.updateACourse, name="updateACourse"),
    path('deleteACourse/<int:courseID>', views.deleteACourse, name="deleteACourse"),

    path('course/<int:courseID>/sections/all/', views.getAllSections, name="getAllSections"),
    path('course/<int:courseID>/<int:sectionID>/', views.getASection, name="getASection"),
    path('course/<int:courseID>/addASection/', views.addASection, name="addASection"),
    path('course/<int:courseID>/updateASection/', views.updateASection, name="updateASection"),
    path('course/<int:courseID>/deleteASection/<int:sectionID>/', views.deleteASection, name="deleteASection"),
    path('course/<int:pk>/', views.CourseDetailAPIView.as_view(), name='course-detail'),

    path('section/<int:sectionID>/getAllVideos/', views.getAllVideos, name="getAllVideos"),
    path('section/<int:sectionID>/addAVideo/', views.addAVideo, name="addAVideo"),
    path('section/<int:sectionID>/deleteAVideo/<int:videoID>', views.deleteAVideo, name="deleteAVideo"),
    path('section/<int:sectionID>/updateAVideo/<int:videoID>', views.updateAVideo, name="updateAVideo"),

    path('section/<int:sectionID>/questions/all/', views.getAllQuestions, name="getAllQuestions"),
    path('section/<int:sectionID>/<int:questionID>/', views.getAQuestion, name="getAQuestion"),
    path('section/<int:sectionID>/addAQuestion/', views.addAQuestion, name="addAQuestion"),
    path('section/<int:sectionID>/updateAQuestion/', views.updateAQuestion, name="updateAQuestion"),
    path('section/<int:sectionID>/deleteAQuestion/<int:questionID>/', views.deleteAQuestion, name="deleteAQuestion"),

]