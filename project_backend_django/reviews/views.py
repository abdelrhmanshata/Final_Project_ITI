from django.db.models import Avg
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from courseListAPI.models import Course
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import StudentReviewCourse, StudentReviewTeacher, StudentEnrollsInCourse, Approval
from .serializers import StudentReviewCourseSerializer, StudentReviewTeacherSerializer, StudentEnrollsInCourseSerializer
from user_authentication_app.serializers import UserSerializer

from user_authentication_app.models import User

from courseListAPI.serializers import CourseSerializer
#
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# from .models import StudentReviewCourse, StudentReviewTeacher, StudentEnrollsInCourse
# from .serializers import (
#     StudentReviewCourseSerializer,
#     StudentReviewTeacherSerializer,
#     StudentEnrollsInCourseSerializer
# )
# from user_authentication_app.models import User
# from courseListAPI.models import Course
# from courseListAPI.serializers import CourseSerializer


# Create your views here.
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_review(request, id):
    # serializer = UserSerializer(data=request.data)
    # if serializer.is_valid():
        # try:
        #     validated_data = serializer.validated_data
        #     usertype = validated_data.get("usertype")
        #     if usertype == 'student':
        #         student_email = validated_data.get("email")
        #         if request.user.email == student_email:
    studentID = request.user.id
    courseID = get_object_or_404(Course, id=id)
    data = request.data
    review = courseID.studcoursereviews.filter(studentID=studentID).first()

    if data['courseReviewScore'] <= 0 or data['courseReviewScore'] > 5:
        return Response({'message': "Error: Please select a score between 1 and 5."}, status=status.HTTP_400_BAD_REQUEST)
    serializer = StudentReviewCourseSerializer(instance=review, data=data)
    if serializer.is_valid():
        serializer.save(studentID=studentID, courseID=courseID)
        # courseReviewScore = courseID.studcoursereviews.aggregate(avg_ratings=Avg('courseReviewScore'))
        #
        # courseID.courseReviewScore = courseReviewScore['avg_ratings']
        avg_review_score = StudentReviewCourse.objects.filter(courseID=courseID).aggregate(avg_score=Avg('courseReviewScore'))['avg_score']
        courseID.courseReviewScore = avg_review_score
        courseID.save()

        if review:
            return Response({'message': "Course review updated"})
        else:
            return Response({'message': "Course review created"})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # else:
                #     return Response({'error': 'Email provided does not match the logged-in user email'}, status=status.HTTP_400_BAD_REQUEST)
        #     else:
        #         raise PermissionDenied("User is not authorized to create a review")
        # except Exception as e:
        #     return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def delete_review(request, id):
    studentID = request.user.id
    courseID = get_object_or_404(Course, id=id)
    # data = request.data
    # reviewText = courseID.studcoursereviews.filter(studentID=studentID)
    review = courseID.studcoursereviews.filter(studentID=studentID).first()

    # if request.user.usertype == 'student':

    if review is not None:
        review.delete()
        rating = courseID.studcoursereviews.aggregate(avg_ratings=Avg('courseReviewScore'))
        if rating['avg_ratings'] is None:
            rating['avg_ratings']=0
            courseID.courseReviewScore = rating['avg_ratings']
            courseID.save()
            return Response({'message': "Course review Deleted"})

    else:
        return Response({'error':'Review not found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_review_for_teacher(request, student_id, teacher_id):
    # Retrieve the student and teacher objects
    student = get_object_or_404(User, id=student_id)
    teacher = get_object_or_404(User, id=teacher_id)

    # Check if the student has already reviewed the teacher
    existing_review = StudentReviewTeacher.objects.filter(studentID=student, teacherID=teacher).first()

    if existing_review:
        existing_review.delete()

        # Recalculate the average score for the teacher
        teacher_avg_score = StudentReviewTeacher.objects.filter(teacherID=teacher.id).aggregate(avg_score=Avg('teacherReviewScore'))['avg_score']
        teacher.teacher_avg_score = teacher_avg_score
        teacher.save()

        return Response({'message': 'Teacher review deleted'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Teacher review not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_review_for_teacher(request, student_id, teacher_id):
    data = request.data
    teacher_review_score = data.get('teacherReviewScore')

    # Retrieve the student and teacher objects
    student = get_object_or_404(User, id=student_id)
    teacher = get_object_or_404(User, id=teacher_id)

    # Check if the student has already reviewed the teacher
    existing_review = StudentReviewTeacher.objects.filter(studentID=student, teacherID=teacher).first()

    if existing_review:
        # Update existing review
        serializer = StudentReviewTeacherSerializer(instance=existing_review, data={
            'teacherReviewScore': teacher_review_score,
            'reviewText': data.get('reviewText', '')
        })
        message = "Teacher review updated"
    else:
        # Create new review
        serializer = StudentReviewTeacherSerializer(data={
            'studentID': student.id,
            'teacherID': teacher.id,
            'teacherReviewScore': teacher_review_score,
            'reviewText': data.get('reviewText', '')
        })
        message = "Teacher review created"
    if serializer.is_valid():
        serializer.save()

        # Calculate the average score for the teacher
        teacher_avg_score = StudentReviewTeacher.objects.filter(teacherID=teacher.id).aggregate(avg_score=Avg('teacherReviewScore'))['avg_score']
        teacher.teacher_avg_score = teacher_avg_score
        teacher.save()

        return Response({'message': message}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def enroll_student_in_course(request, student_id, course_id):
#     course = Course.objects.filter(id=course_id).first()
#
#     if not course:
#         return Response({'message': 'Course not found'}, status=404)
#
#     if StudentEnrollsInCourse.objects.filter(studentID=student_id, courseID=course_id).exists():
#         return Response({'message': 'Student is already enrolled in this course'}, status=400)
#
#     serializer = StudentEnrollsInCourseSerializer(data={'studentID': student_id, 'courseID': course_id})
#     if serializer.is_valid():
#         serializer.save()
#
#         # Get details of courses for the student
#         student_courses = StudentEnrollsInCourse.objects.filter(studentID=student_id)
#         student_course_details = CourseSerializer(student_courses, many=True).data
#
#         # Get details of students enrolled in the course
#         course_students = StudentEnrollsInCourse.objects.filter(courseID=course_id)
#         course_student_details = UserSerializer(course_students, many=True).data
#
#         response_data = {
#             'message': 'Student enrolled in course successfully',
#             'student_courses': student_course_details,
#             'course_students': course_student_details
#         }
#         return Response(response_data, status=201)
#     else:
#         return Response(serializer.errors, status=400)
# @api_view(['GET'])
# def courses_enrolled_by_student(request, student_id):
#     courses_enrolled = StudentEnrollsInCourse.objects.filter(studentID=student_id).count()
#     return Response({'courses_enrolled': courses_enrolled}, status=200)
#
#
# @api_view(['GET'])
# def students_enrolled_in_course(request, course_id):
#     students_enrolled = StudentEnrollsInCourse.objects.filter(courseID=course_id).count()
#     return Response({'students_enrolled': students_enrolled}, status=200)


@api_view(['POST'])
def enroll_student(request, student_id, course_id):
    student = get_object_or_404(User, id=student_id)
    course = get_object_or_404(Course, id=course_id)

    enrollment = StudentEnrollsInCourse(student=student, course=course)
    enrollment.save()

    return Response({'message': 'Student enrolled in course'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def approve_enrollment(request, enrollment_id,  teacher_id):
    enrollment = get_object_or_404(StudentEnrollsInCourse, id=enrollment_id)
    enrollment.is_approved = True
    enrollment.save()
    teacher = get_object_or_404(User, id=teacher_id)
    approval = Approval(teacher=teacher, enrollment=enrollment)
    approval.save()

    return Response({'message': 'Enrollment approved'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def student_enrollments(request, student_id):
    student = get_object_or_404(User, id=student_id)
    enrollments = StudentEnrollsInCourse.objects.filter(studentID=student)
    serializer = StudentEnrollsInCourseSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def course_enrollments(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    enrollments = StudentEnrollsInCourse.objects.filter(courseID=course)
    serializer = StudentEnrollsInCourseSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def remove_enrollment(request, enrollment_id):
    if StudentEnrollsInCourse.objects.filter(id=enrollment_id).exists():
        enrollment = get_object_or_404(StudentEnrollsInCourse, id=enrollment_id)
        enrollment.delete()

        return Response({'message': 'Enrollment removed successfully'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'message': 'Enrollment does not exist'}, status=status.HTTP_404_NOT_FOUND)