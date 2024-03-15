from django.db import models
from user_authentication_app.models import User

# from courseListAPI.models import Course
# Create your models here.


class StudentReviewCourse(models.Model):
    courseID = models.ForeignKey(
        "courseListAPI.Course",
        null=True,
        on_delete=models.CASCADE,
        related_name="studcoursereviews",
    )
    studentID = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    studentName = models.TextField(max_length=1000, default="", blank=False)
    courseReviewScore = models.FloatField(default=0)
    reviewText = models.TextField(max_length=1000, default="", blank=False)

    def __str__(self):
        return str(self.courseReviewScore)


# #*S_ID,#*CourseID,ReviewRating,ReviewText


class StudentReviewTeacher(models.Model):
    studentID = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="student_reviews"
    )
    teacherID = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="teacher_reviews"
    )
    teacherReviewScore = models.FloatField(default=0)
    reviewText = models.TextField(max_length=1000, default="", blank=False)

    class Meta:
        unique_together = []


# #*T_ID,#*S_ID,ReviewRating,ReviewText


class StudentEnrollsInCourse(models.Model):
    studentID = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    courseID = models.ForeignKey(
        "courseListAPI.Course", null=True, on_delete=models.CASCADE
    )
    teacherID = models.IntegerField(default=0)
    is_approved = models.BooleanField(default=False)


class Approval(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    enrollment = models.OneToOneField(StudentEnrollsInCourse, on_delete=models.CASCADE)


# #*S_ID,#*CourseID
