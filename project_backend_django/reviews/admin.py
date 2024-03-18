from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(StudentReviewCourse)
admin.site.register(StudentReviewTeacher)
admin.site.register(StudentEnrollsInCourse)
admin.site.register(Approval)

