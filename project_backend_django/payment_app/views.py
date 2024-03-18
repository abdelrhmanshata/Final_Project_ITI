from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from courseListAPI.serializers import CourseSerializer
from .serializers import PaymentSerialzer
from .models import Course
from payment_app.models import Payment_Course
from user_authentication_app.models import User
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import stripe
from rest_framework.decorators import api_view
from user_authentication_app.serializers import UserSerializer

# Create your views here.
stripe.api_key = settings.STRIPE_SECRET_KEY


class CoursePreview(RetrieveAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        # Retrieve the course instance based on the lookup field value
        course_id = kwargs.get("pk")  # Assuming 'pk' is the lookup field
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            return Response("Course not found", status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateStripeCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        course_id = self.kwargs["pk"]
        user_id = self.kwargs["userID"]
        try:
            user = User.objects.get(pk=user_id)
            course = Course.objects.get(pk=course_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "unit_amount": int(course.coursePrice) * 100,
                            "product_data": {
                                "name": course.courseName,
                                "description": course.courseDescription,
                            },
                        },
                        "quantity": 1,
                    }
                ],
                mode="payment",
                metadata={"course_id": course.id},
                success_url=settings.SITE_URL
                + "?success=true"
                + "&course_id="
                + course_id
                + "&user_id="
                + user_id
                + "",
                cancel_url=settings.SITE_URL + "?cancel=true",
            )

            obj = Payment_Course.objects.create(
                paymentID=checkout_session.id, course_model=course, user_model=user
            )
            obj.save()
            return redirect(checkout_session.url)
        except Exception as e:
            return Response(
                {
                    "msg": "Something went wrong while creating the Stripe session",
                    "error": str(e),
                },
                status=500,
            )


@api_view(["GET"])
def getPaymentCourse(request, userID):
    paymentCourses = Payment_Course.objects.filter(user_model=userID)
    coursesList = []
    for obj in paymentCourses:
        coursesList.append(obj.course_model)
    if coursesList:
        datajson = CourseSerializer(coursesList, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})


@api_view(["GET"])
def checkPayment(request, userID, courseID):
    paymentCourses = Payment_Course.objects.filter(
        user_model=userID, course_model=courseID
    )
    if paymentCourses:
        paymentDataJson = PaymentSerialzer(paymentCourses, many=True).data
        courses = []
        for obj in paymentCourses:
            courses.append(obj.course_model)
        if courses:
            coursesDataJson = CourseSerializer(courses, many=True).data
        users = []
        for obj in paymentCourses:
            users.append(obj.user_model)
        if users:
            usersDataJson = UserSerializer(users, many=True).data

        return Response(
            {
                "payment": paymentDataJson,
                "course": coursesDataJson,
                "user": usersDataJson,
                "status": True,
            }
        )
    return Response({"message": "Course Not Found.", "status": False})
