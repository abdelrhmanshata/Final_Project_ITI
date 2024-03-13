from django.urls import path
from .views import CoursePreview,CreateStripeCheckoutSession

urlpatterns = [
    path("course/<int:pk>", CoursePreview.as_view(), name='course'),
    path("create-checkout-session/<pk>/",CreateStripeCheckoutSession.as_view(),name='checkout-session')
]