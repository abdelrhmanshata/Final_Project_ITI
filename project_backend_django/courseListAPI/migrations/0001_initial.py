# Generated by Django 5.0.2 on 2024-03-13 11:02

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questionHead', models.CharField(max_length=50)),
                ('questionAnswer', models.CharField(max_length=50)),
                ('questionImage', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseName', models.CharField(max_length=50)),
                ('courseDescription', models.CharField(max_length=300)),
                ('coursePrice', models.FloatField()),
                ('courseReviewScore', models.FloatField()),
                ('courseType', models.CharField(max_length=50)),
                ('courseImage', models.ImageField(blank=True, default='default.jpg', null=True, upload_to='course_images')),
                ('courseLessons', models.IntegerField(default=0)),
                ('courseHours', models.FloatField(default=0)),
                ('courseDate', models.DateField(default=django.utils.timezone.now, null=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answerText', models.CharField(max_length=50)),
                ('isAnswer', models.BooleanField(default=False)),
                ('questionID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.question')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sectionName', models.CharField(max_length=50)),
                ('courseID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='sectionID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.section'),
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('videoTitle', models.CharField(max_length=50)),
                ('videoDescription', models.CharField(max_length=300)),
                ('videoLink', models.CharField(max_length=50)),
                ('sectionID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.section')),
            ],
        ),
    ]
