from django.urls import path
from . import views

urlpatterns = [
    # Courses
    path("listAllCourses/", views.listAllCourses, name="listAllCourses"),
    path("listAllCourses/<int:courseID>", views.getACourse, name="getACourse"),
    path("addACourse/", views.addACourse, name="addACourse"),
    path("updateACourse/<int:courseID>", views.updateACourse, name="updateACourse"),
    path("deleteACourse/<int:courseID>", views.deleteACourse, name="deleteACourse"),
    path(
        "teacherCourses/<int:teacherID>",
        views.getTeacherCourse,
        name="getTeacherCourses",
    ),
    path("get_image/<int:courseID>", views.getImage, name="get_image"),
    # Sections
    path("<int:courseID>/sections/all/", views.getAllSections, name="getAllSections"),
    path("<int:courseID>/<int:sectionID>/", views.getASection, name="getASection"),
    path("<int:courseID>/addASection/", views.addASection, name="addASection"),
    path("updateASection/<int:sectionID>/", views.updateASection, name="updateASection"),
    path(
        "deleteASection/<int:sectionID>/",
        views.deleteASection,
        name="deleteASection",
    ),
    # Videos
    path(
        "section/<int:sectionID>/getAllVideos/", views.getAllVideos, name="getAllVideos"
    ),
    path("section/<int:sectionID>/addAVideo/", views.addAVideo, name="addAVideo"),
    # path(
    #     "section/<int:sectionID>/deleteAVideo/<int:videoID>",
    #     views.deleteAVideo,
    #     name="deleteAVideo",
    # ),
    path(
        "deleteAVideo/<int:videoID>",
        views.deleteAVideo,
        name="deleteAVideo",
    ),
    path(
        "section/updateAVideo/<int:videoID>",
        views.updateAVideo,
        name="updateAVideo",
    ),
    # Questions
    path(
        "section/<int:sectionID>/questions/all/",
        views.getAllQuestions,
        name="getAllQuestions",
    ),
    path(
        "section/<int:sectionID>/<int:questionID>/",
        views.getAQuestion,
        name="getAQuestion",
    ),
    path(
        "section/<int:sectionID>/addAQuestion/", views.addAQuestion, name="addAQuestion"
    ),
    path(
        "section/<int:sectionID>/updateAQuestion/",
        views.updateAQuestion,
        name="updateAQuestion",
    ),
    path(
        "section/<int:sectionID>/deleteAQuestion/",
        views.deleteAQuestion,
        name="deleteAQuestion",
    ),
    # Answers
    path(
        "section/<int:sectionID>/<int:questionID>/addAnAnswer/",
        views.addAnAnswer,
        name="addAnAnswer",
    ),
    path(
        "section/<int:sectionID>/<int:questionID>/getAllAnswers/",
        views.getAllAnswers,
        name="getAllAnswers",
    ),
]
