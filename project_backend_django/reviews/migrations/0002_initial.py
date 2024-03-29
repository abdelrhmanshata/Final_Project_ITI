# Generated by Django 5.0.2 on 2024-03-19 21:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courseListAPI', '0002_initial'),
        ('reviews', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentEnrollsInCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teacherID', models.IntegerField(default=0)),
                ('is_approved', models.BooleanField(default=False)),
                ('courseID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course')),
                ('studentID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Approval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('enrollment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='reviews.studentenrollsincourse')),
            ],
        ),
        migrations.CreateModel(
            name='StudentReviewCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('studentName', models.TextField(default='', max_length=1000)),
                ('courseReviewScore', models.FloatField(default=0)),
                ('reviewText', models.TextField(default='', max_length=1000)),
                ('courseID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='studcoursereviews', to='courseListAPI.course')),
                ('studentID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentReviewTeacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teacherReviewScore', models.FloatField(default=0)),
                ('reviewText', models.TextField(default='', max_length=1000)),
                ('studentID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='student_reviews', to=settings.AUTH_USER_MODEL)),
                ('teacherID', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='teacher_reviews', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
