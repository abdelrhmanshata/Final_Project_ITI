from django.urls import path

from . import views


urlpatterns = [

    path('students/', views.get_all_students, name='students'),
    path('students/<str:pk>/', views.get_student, name='get_student'),

]
