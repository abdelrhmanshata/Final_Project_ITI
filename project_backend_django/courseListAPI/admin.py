from django.contrib import admin

# Register your models here.
from .models import Course,Section,Question,Answer,Video

admin.site.register(Course)
admin.site.register(Section)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Video)

