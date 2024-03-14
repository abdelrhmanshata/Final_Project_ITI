
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("<int:id>/", views.create_review, name="create_review"),
    path("<int:id>/delete/", views.delete_review, name="delete_review"),
    path('review_for_teacher/<int:student_id>/<int:teacher_id>/', views.create_review_for_teacher, name='create_review_for_teacher'),
    path('review_for_teacher/<int:student_id>/<int:teacher_id>/delete/', views.delete_review_for_teacher, name='delete_review_for_teacher'),
    path('students/<int:student_id>/enroll/<int:course_id>/', views.enroll_student, name='enroll_student'),
    path('approve/enrollment/<int:enrollment_id>/<int:teacher_id>/', views.approve_enrollment, name='approve_enrollment'),
    path('remove/enrollment/<int:enrollment_id>/', views.remove_enrollment, name='remove_enrollment'),
    path('student/<int:student_id>/enrollments/', views.student_enrollments, name='student_enrollments'),
    path('course/<int:course_id>/enrollments/', views.course_enrollments, name='course_enrollments'),

]
