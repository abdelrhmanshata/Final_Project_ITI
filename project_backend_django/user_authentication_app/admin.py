from django.contrib import admin
# Register your models here.

from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['usertype', 'name', 'email', 'classroom', 'subject', 'teacher_avg_score', 'educationstage']
    # list_display_links = ['']
    list_editable = ['name', 'email', 'classroom', 'subject', 'teacher_avg_score', 'educationstage']
    search_fields = ['usertype', 'name', 'email', 'classroom', 'subject', 'teacher_avg_score', 'educationstage']
    list_filter = ['usertype','subject','educationstage','teacher_avg_score']

admin.site.register(User, UserAdmin)
