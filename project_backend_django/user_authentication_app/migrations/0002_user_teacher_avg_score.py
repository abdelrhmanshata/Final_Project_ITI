# Generated by Django 5.0.2 on 2024-03-13 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_authentication_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='teacher_avg_score',
            field=models.FloatField(default=0),
        ),
    ]
