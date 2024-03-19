from django.db.models import Avg, Count
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from courseListAPI.models import Course
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import (
    StudentReviewCourse,
    StudentReviewTeacher,
    StudentEnrollsInCourse,
    Approval,
)
from .serializers import (
    StudentReviewCourseSerializer,
    StudentReviewTeacherSerializer,
    StudentEnrollsInCourseSerializer,
)
from user_authentication_app.serializers import UserSerializer

from user_authentication_app.models import User

from courseListAPI.serializers import CourseSerializer


# Create your views here.
@api_view(["POST"])
def create_review(request, student_id, course_id):
    studentID = get_object_or_404(User, id=student_id)
    courseID = get_object_or_404(Course, id=course_id)
    data = request.data

    review = StudentReviewCourse()
    review = courseID.studcoursereviews.filter(studentID=studentID).first()
    if review:
        review.studentName = studentID.name

    if data["courseReviewScore"] <= 0 or data["courseReviewScore"] > 5:
        return Response(
            {"message": "Error: Please select a score between 1 and 5."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    serializer = StudentReviewCourseSerializer(instance=review, data=data)
    if serializer.is_valid():
        serializer.save(studentID=studentID, courseID=courseID)
        avg_review_score = StudentReviewCourse.objects.filter(
            courseID=courseID
        ).aggregate(avg_score=Avg("courseReviewScore"))["avg_score"]
        courseID.courseReviewScore = avg_review_score
        courseID.save()

        if review:
            return Response({"message": "Course review updated"})
        else:
            return Response({"message": "Course review created"})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_review(request, student_id, course_id):
    studentID = get_object_or_404(User, id=student_id)
    courseID = get_object_or_404(Course, id=course_id)
    review = courseID.studcoursereviews.filter(studentID=studentID).first()

    if review is not None:
        review.delete()
        rating = courseID.studcoursereviews.aggregate(
            avg_ratings=Avg("courseReviewScore")
        )
        if rating["avg_ratings"] is None:
            rating["avg_ratings"] = 0
            courseID.courseReviewScore = rating["avg_ratings"]
            courseID.save()
            return Response({"message": "Course review Deleted"})

    else:
        return Response(
            {"error": "Review not found"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["DELETE"])
def delete_review_for_teacher(request, student_id, teacher_id):
    # Retrieve the student and teacher objects
    student = get_object_or_404(User, id=student_id)
    teacher = get_object_or_404(User, id=teacher_id)

    # Check if the student has already reviewed the teacher
    existing_review = StudentReviewTeacher.objects.filter(
        studentID=student, teacherID=teacher
    ).first()

    if existing_review:
        existing_review.delete()

        # Recalculate the average score for the teacher
        teacher_avg_score = StudentReviewTeacher.objects.filter(
            teacherID=teacher.id
        ).aggregate(avg_score=Avg("teacherReviewScore"))["avg_score"]
        teacher.teacher_avg_score = teacher_avg_score
        teacher.save()

        return Response(
            {"message": "Teacher review deleted"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"message": "Teacher review not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
def create_review_for_teacher(request, student_id, teacher_id):
    data = request.data
    teacher_review_score = data.get("teacherReviewScore")

    # Retrieve the student and teacher objects
    student = get_object_or_404(User, id=student_id)
    teacher = get_object_or_404(User, id=teacher_id)

    # Check if the student has already reviewed the teacher
    existing_review = StudentReviewTeacher.objects.filter(
        studentID=student, teacherID=teacher
    ).first()

    if existing_review:
        # Update existing review
        serializer = StudentReviewTeacherSerializer(
            instance=existing_review,
            data={
                "teacherReviewScore": teacher_review_score,
                "reviewText": data.get("reviewText", ""),
            },
        )
        message = "Teacher review updated"
    else:
        # Create new review
        serializer = StudentReviewTeacherSerializer(
            data={
                "studentID": student.id,
                "teacherID": teacher.id,
                "teacherReviewScore": teacher_review_score,
                "reviewText": data.get("reviewText", ""),
            }
        )
        message = "Teacher review created"
    if serializer.is_valid():
        serializer.save()

        # Calculate the average score for the teacher
        teacher_avg_score = StudentReviewTeacher.objects.filter(
            teacherID=teacher.id
        ).aggregate(avg_score=Avg("teacherReviewScore"))["avg_score"]
        teacher.teacher_avg_score = teacher_avg_score
        teacher.save()

        return Response({"message": message}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def enroll_student(request, student_id, course_id):

    student = get_object_or_404(User, id=student_id)
    course = get_object_or_404(Course, id=course_id)

    isStudentEnroll = StudentEnrollsInCourse.objects.filter(
        studentID=student_id, courseID=course_id
    )

    if isStudentEnroll:
        return Response(
            {
                "message": "You have register for this course before",
                "status": False,
            }
        )
    else:
        enrollment = StudentEnrollsInCourse(
            studentID=student,
            courseID=course,
            teacherID=course.userID.id,
            is_approved=False,
        )
        enrollment.save()
    return Response(
        {
            "message": "Student enrolled in course",
            "status": True,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
def checkIsEnroll(request, student_id, course_id):
    isStudentEnroll = StudentEnrollsInCourse.objects.filter(
        studentID=student_id, courseID=course_id
    )
    if isStudentEnroll:
        if isStudentEnroll[0].is_approved:
            return Response(
                {
                    "status": True,
                }
            )
    return Response(
        {
            "status": False,
        }
    )


@api_view(["POST"])
def approve_enrollment(request, enrollment_id, teacher_id):
    enrollment = get_object_or_404(StudentEnrollsInCourse, id=enrollment_id)
    enrollment.is_approved = True
    enrollment.save()
    teacher = get_object_or_404(User, id=teacher_id)
    approval = Approval(teacher=teacher, enrollment=enrollment)
    approval.save()

    return Response({"message": "Enrollment approved"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def student_enrollments(request, student_id):
    student = get_object_or_404(User, id=student_id)
    enrollments = StudentEnrollsInCourse.objects.filter(studentID=student)
    serializer = StudentEnrollsInCourseSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def course_enrollments(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    enrollments = StudentEnrollsInCourse.objects.filter(courseID=course)
    serializer = StudentEnrollsInCourseSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def remove_enrollment(request, enrollment_id):
    if StudentEnrollsInCourse.objects.filter(id=enrollment_id).exists():
        enrollment = get_object_or_404(StudentEnrollsInCourse, id=enrollment_id)
        enrollment.delete()

        return Response(
            {"message": "Enrollment removed successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
    else:
        return Response(
            {"message": "Enrollment does not exist"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
def count_students_by_score_range(request, id):
    course = get_object_or_404(Course, id=id)

    # Define score ranges and initialize counts
    score_ranges = {
        "0-1": (0, 1),
        "1-2": (1, 2),
        "2-3": (2, 3),
        "3-4": (3, 4),
        "4-5": (4, 6),
    }
    count_by_range = {range_key: 0 for range_key in score_ranges}

    # Count students for each score range
    for range_key, score_range in score_ranges.items():
        lower_bound, upper_bound = score_range
        count = course.studcoursereviews.filter(
            courseReviewScore__gte=lower_bound, courseReviewScore__lt=upper_bound
        ).count()
        count_by_range[range_key] = count

    return Response({"count_by_range": count_by_range}, status=status.HTTP_200_OK)


@api_view(["GET"])
def studentEnrollmentCourses(request, teacherID):
    enrollments = StudentEnrollsInCourse.objects.filter(teacherID=teacherID)
    serializer = StudentEnrollsInCourseSerializer(enrollments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def isApproveEnrollment(request, studentID, courseID, value):
    enrollment = StudentEnrollsInCourse.objects.get(
        studentID=studentID, courseID=courseID
    )
    if value == "True":
        enrollment.is_approved = True
    else:
        enrollment.is_approved = False
    enrollment.save()
    return Response({"status": "Update Enrollment successfully"})


@api_view(["GET"])
def teacher_review_count(request, teacherID):
    try:
        review_count = StudentReviewTeacher.objects.filter(
            teacherID=teacherID
        ).aggregate(review_count=Count("id"))["review_count"]
        return JsonResponse({"teacherID": teacherID, "review_count": review_count})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@api_view(["GET"])
def getEnrollCourse(request, userID):
    enrollCourses = StudentEnrollsInCourse.objects.filter(studentID=userID)
    coursesList = []
    for obj in enrollCourses:
        if obj.is_approved:
            coursesList.append(obj.courseID)
    if coursesList:
        datajson = CourseSerializer(coursesList, many=True).data
        return Response({"message": datajson})
    return Response({"message": "Course Not Found."})
