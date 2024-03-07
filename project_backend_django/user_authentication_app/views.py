from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime

class RegisterView(APIView):
    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            usertype = validated_data.get('usertype')
            required_fields = []
            if usertype == 'teacher':
                required_fields = ['identificationcard', 'name', 'email', 'phonenumber', 'password', 'address',
                                   'gradelevels', 'image']
            elif usertype == 'student':
                required_fields = ['name', 'email', 'phonenumber', 'password', 'address', 'educationstage', 'classroom']
            else:
                return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)
            missing_fields = [field for field in required_fields if field not in validated_data]
            if missing_fields:
                return Response({"error": f"Missing required fields: {', '.join(missing_fields)}"},
                                status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            data = {
                'message': 'added successfully',
                'id': serializer.data["id"],
                'status': status.HTTP_201_CREATED
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# login class 
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User Not Found !!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password !!')
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response