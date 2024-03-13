from django.contrib import admin
from .models import Payment_Course
from courseListAPI.models import Course
# Register your models here.
admin.site.register(Course)
admin.site.register(Payment_Course)