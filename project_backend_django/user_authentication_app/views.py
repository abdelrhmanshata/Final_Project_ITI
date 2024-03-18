from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User, PasswordReset
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from django.http import JsonResponse
import jwt, datetime, random, string
from django.core.mail import send_mail
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import APIException
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from user_authentication_app import serializers
from django.views.static import serve
from django.conf import settings
from django.template.loader import render_to_string  
# ------------
from django.core.mail import EmailMessage

def apiConnection(request):
    response_data = {"message": "Welcome to API!"}
    return JsonResponse(response_data)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            usertype = validated_data.get("usertype")
            required_fields = []
            if usertype == "teacher":
                required_fields = [
                    "identificationcard",
                    "name",
                    "email",
                    "phonenumber",
                    "password",
                    "address",
                    "gradelevels",
                    "image",
                ]
            elif usertype == "student":
                required_fields = [
                    "name",
                    "email",
                    "phonenumber",
                    "password",
                    "address",
                    "educationstage",
                    "classroom",
                ]
            else:
                return Response(
                    {"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST
                )
            missing_fields = [
                field for field in required_fields if field not in validated_data
            ]
            if missing_fields:
                return Response(
                    {"error": f"Missing required fields: {', '.join(missing_fields)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            data = {
                "message": "added successfully",
                "id": serializer.data["id"],
                "status": status.HTTP_201_CREATED,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# login class
class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User Not Found !!")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password !!")
        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=1),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")

        response = Response()
        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {
            "jwt": token,
            "userID": user.id,
            "userType": user.usertype,
            "isAdmin": user.is_superuser,
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("Unauthenticated!")

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")

        user = User.objects.filter(id=payload["id"]).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response


class ForgetPasswordView(APIView):
    def post(self, request):
        email = request.data["email"]
        # function to generate a random token
        token = "".join(
            random.choice(string.ascii_uppercase + string.digits) for _ in range(12)
        )
        PasswordReset.objects.create(email=email, token=token)
        try:
            send_mail(
                subject="Reset Your Password",
                message='Click "http://localhost:3000/reset/'
                + token
                + '"to reset your password',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
            )
        except Exception as e:
            print("Error", e)
        return Response({"message": "Please Check Your Email"})


class ResetPasswordView(APIView):
    def post(self, request):
        data = request.data

        if data["password"] != data["password_confirm"]:
            raise APIException("passwords does not match")

        passwordreset = PasswordReset.objects.filter(token=data["token"]).first()

        user = User.objects.filter(email=passwordreset.email).first()

        if not user:
            raise NotFound("user not found")

        user.set_password(data["password"])
        user.save()

        return Response({"message": "Success"})


# getting all teachers
@api_view(["GET"])
def Print_All_Teachers(request):
    data = User.objects.filter(usertype="teacher")
    datajson = UserSerializer(data, many=True).data
    return Response({"data": datajson})


# getting all students
@api_view(["GET"])
def Print_All_Students(request):
    data = User.objects.filter(usertype="student")
    datajson = UserSerializer(data, many=True).data
    return Response({"data": datajson})


# print all users
@api_view(["GET"])
def Print_All_Users(request):
    data = User.objects.all()
    datajson = UserSerializer(data, many=True).data
    return Response({"data": datajson})


# getting specific user
@api_view(["GET"])
def Get_Specific_User(request, id):
    user = get_object_or_404(User, id=id)
    serializer_class = UserSerializer(user).data
    return Response({"data": serializer_class})


# update user
@api_view(["PUT"])
def Update_User(request, id):
    try:
        updateobj = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"msg": "User Not Found"}, status=404)

    data = request.data.copy()  # Create a copy of request data

    if "image" in data and hasattr(data["image"], "file"):
        serialized_user = UserSerializer(instance=updateobj, data=data, partial=True)
    else:
        # Remove the 'image' key from request data if it's not a file
        data.pop("image", None)
        serialized_user = UserSerializer(instance=updateobj, data=data, partial=True)

    if serialized_user.is_valid():
        serialized_user.save()
        return Response(data=serialized_user.data)
    else:
        print("Error : ", serialized_user.errors)
        return Response(serialized_user.errors, status=400)


#  delete specific user
@api_view(["GET"])
def Delete_User(request, id):
    User_Delete = User.objects.filter(id=id).first()
    if User_Delete:
        User_Delete.delete()
        return Response({"msg": " User Deleted Successfully "})
    return Response({"msg": " User Not Found "})


# for approving the teacher by the admin
@api_view(["GET"])
def Get_Approved_User(request, userId, isApprove):
    user = get_object_or_404(User, id=userId)
    if isApprove == 0:
        user.isApprove = False
    else:
        user.isApprove = True
    user.save()
    data = UserSerializer(user).data
    return Response({"data": data})


@api_view(["GET"])
def getUserImage(request, userID):
    user = User.objects.get(id=userID)
    image_path = settings.MEDIA_ROOT + user.image.name
    return serve(request, image_path, document_root=settings.MEDIA_ROOT)
