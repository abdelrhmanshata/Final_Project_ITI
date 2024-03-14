# Generated by Django 5.0.2 on 2024-03-12 09:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courseListAPI', '0009_course_reviewtext'),
        ('reviews', '0004_rename_coursereviewscore_studentreviewteacher_teacherreviewscore_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='reviews',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='studcoursereviews', to='reviews.studentreviewcourse'),
        ),
    ]
