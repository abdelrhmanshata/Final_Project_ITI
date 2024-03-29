# Generated by Django 5.0.2 on 2024-03-19 21:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courseListAPI', '0002_initial'),
        ('reviews', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='reviews',
            field=models.ManyToManyField(blank=True, related_name='studcoursereviews', to='reviews.studentreviewcourse'),
        ),
        migrations.AddField(
            model_name='course',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='courseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course'),
        ),
        migrations.AddField(
            model_name='answer',
            name='questionID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.question'),
        ),
        migrations.AddField(
            model_name='requirement',
            name='courseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course'),
        ),
        migrations.AddField(
            model_name='section',
            name='courseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course'),
        ),
        migrations.AddField(
            model_name='video',
            name='sectionID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.section'),
        ),
        migrations.AddField(
            model_name='whatyoulllearn',
            name='courseID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course'),
        ),
    ]
