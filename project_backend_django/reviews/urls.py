from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
#    Review
    path(
        "review_for_course/<int:student_id>/<int:course_id>/",
        views.create_review,
        name="create_review",
    ),
    path(
        "review_for_course/<int:student_id>/<int:course_id>/",
        views.delete_review,
        name="delete_review",
    ),
    path(
        "review_for_teacher/<int:student_id>/<int:teacher_id>/",
        views.create_review_for_teacher,
        name="create_review_for_teacher",
    ),
    path(
        "review_for_teacher/<int:student_id>/<int:teacher_id>/delete/",
        views.delete_review_for_teacher,
        name="delete_review_for_teacher",
    ),
#    
    path(
        "students/<int:student_id>/enroll/<int:course_id>/",
        views.enroll_student,
        name="enroll_student",
    ),
    path(
        "approve/enrollment/<int:enrollment_id>/<int:teacher_id>/",
        views.approve_enrollment,
        name="approve_enrollment",
    ),
    path(
        "remove/enrollment/<int:enrollment_id>/",
        views.remove_enrollment,
        name="remove_enrollment",
    ),
    path(
        "student/<int:student_id>/enrollments/",
        views.student_enrollments,
        name="student_enrollments",
    ),
    path(
        "course/<int:course_id>/enrollments/",
        views.course_enrollments,
        name="course_enrollments",
    ),
    path(
        "course/<int:id>/score/count/",
        views.count_students_by_score_range,
        name="count_students_by_score_range",
    ),
    path(
        "course/studentEnroll/<int:teacherID>",
        views.studentEnrollmentCourses,
        name="studentEnrollmentCourses",
    ),
    path(
        "isApprove/enrollment/<int:studentID>/<int:courseID>/<value>",
        views.isApproveEnrollment,
        name="approve_enrollment",
    ),
    path('review_count/<int:teacherID>/',
         views.teacher_review_count,
         name='teacher_review_count'),
    
    path(
        "enrollCourses/<int:userID>",
        views.getEnrollCourse,
        name="getEnrollCourses",
    ),
]
