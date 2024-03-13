from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from .serializers import CourseSerialzer
from .models import Course
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import stripe

# Create your views here.
stripe.api_key=settings.STRIPE_SECRET_KEY

class CoursePreview(RetrieveAPIView):
    serializer_class = CourseSerialzer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        # Retrieve the course instance based on the lookup field value
        course_id = kwargs.get('pk')  # Assuming 'pk' is the lookup field
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response("Course not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)



class CreateStripeCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        course_id = self.kwargs['pk']
        try:
            course = Course.objects.get(pk=course_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'unit_amount': int(course.coursePrice) * 100,
                            'product_data': {
                                'name': course.courseName,
                                'description':course.courseDescription,
                                # 'reviewscore':course.courseReviewScore,

                            },
                        },
                        'quantity': 1
                    }
                ],
                mode='payment',
                metadata={
                    'course_id': course.id
                },
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?cancel=true'
            )
            return redirect(checkout_session.url)
        except Exception as e:
            return Response({'msg': 'Something went wrong while creating the Stripe session', 'error': str(e)}, status=500)