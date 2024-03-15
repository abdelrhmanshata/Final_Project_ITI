from django.urls import path
from .views import CoursePreview,CreateStripeCheckoutSession
from . import views
urlpatterns = [
    path("course/<int:pk>", CoursePreview.as_view(), name='course'),
    path("create-checkout-session/<pk>/<userID>",CreateStripeCheckoutSession.as_view(),name='checkout-session'),
    path(
        "paymentCourses/<int:userID>",
        views.getPaymentCourse,
        name="getTeacherCourses",
    ),


]