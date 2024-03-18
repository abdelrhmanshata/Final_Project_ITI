from django.contrib import admin

# Register your models here.
from .models import Course, Section, Question, Answer, Video


class CourseAdmin(admin.ModelAdmin):
    list_display = ['userID', 'courseName', 'coursePrice', 'courseType', 'courseLessons', 'courseHours',
                    'courseReviewScore',
                    'courseDate']
    list_editable = ['courseName', 'coursePrice', 'courseType', 'courseLessons', 'courseHours', 'courseReviewScore',
                     'courseDate']
    search_fields = ['courseName', 'coursePrice', 'courseType', 'courseLessons', 'courseHours', 'courseReviewScore',
                     'courseDate']
    list_filter = ['userID', 'courseName', 'coursePrice', 'courseType', 'courseReviewScore']


class SectionAdmin(admin.ModelAdmin):
    list_display = ['courseID', 'sectionName']
    list_editable = ['sectionName']
    search_fields = ['sectionName']
    list_filter = ['courseID', 'sectionName']


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['courseID', 'questionHead']
    list_editable = ['questionHead']
    search_fields = ['questionHead']
    list_filter = ['courseID', 'questionHead']


class AnswerAdmin(admin.ModelAdmin):
    list_display = ['questionID', 'answerText', 'isAnswer']
    list_editable = ['answerText', 'isAnswer']
    search_fields = ['answerText', 'isAnswer']
    list_filter = ['questionID', 'isAnswer']


class VideoAdmin(admin.ModelAdmin):
    list_display = ['sectionID', 'videoTitle', 'videoDescription', 'videoLink']
    list_editable = ['videoTitle', 'videoDescription', 'videoLink']
    search_fields = ['videoTitle', 'videoDescription', 'videoLink']
    list_filter = ['sectionID', 'videoTitle']


admin.site.register(Course, CourseAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Video, VideoAdmin)
