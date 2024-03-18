from django.contrib import admin
from .models import Payment_Course


# Register your models here.

class Payment_CourseAdmin(admin.ModelAdmin):
    list_display = ['paymentID', 'course_model', 'user_model', 'paymentDate']
    list_editable = ['course_model', 'user_model', 'paymentDate']
    list_filter = ['paymentDate']
    search_fields = ['paymentID','paymentDate']


admin.site.register(Payment_Course, Payment_CourseAdmin)
