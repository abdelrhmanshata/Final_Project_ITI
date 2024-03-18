from django.contrib import admin

# Register your models here.
from .models import *


class StudentReviewCourseAdmin(admin.ModelAdmin):
    list_display = ['courseID','studentName', 'courseReviewScore', 'reviewText']
    list_editable = ['courseReviewScore', 'reviewText']
    search_fields = ['studentName', 'courseReviewScore', 'reviewText']
    list_filter = ['courseReviewScore']


class StudentReviewTeacherAdmin(admin.ModelAdmin):
    list_display = ['teacherID', 'teacherReviewScore', 'reviewText']
    list_editable = ['teacherReviewScore', 'reviewText']
    search_fields = ['teacherReviewScore', 'reviewText']
    list_filter = ['teacherReviewScore']


class StudentEnrollsInCourseAdmin(admin.ModelAdmin):
    list_display = ['teacherID', 'studentID', 'courseID', 'is_approved']
    list_editable = ['is_approved']
    search_fields =['teacherID','is_approved']
    # list_filter = ['is_approved']


class ApprovalAdmin(admin.ModelAdmin):
    list_display = ['teacher', 'enrollment']
    list_editable = ['enrollment']
    # list_filter = ['teacher']


admin.site.register(StudentReviewCourse, StudentReviewCourseAdmin)
admin.site.register(StudentReviewTeacher, StudentReviewTeacherAdmin)
admin.site.register(StudentEnrollsInCourse, StudentEnrollsInCourseAdmin)
admin.site.register(Approval, ApprovalAdmin)
admin.site.site_header = 'EduNesxus E-Learning'
admin.site.site_title = 'EduNesxus E-Learning'
