# Generated by Django 5.0.2 on 2024-03-15 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0007_studentenrollsincourse_is_approved_approval'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentreviewcourse',
            name='studentName',
            field=models.TextField(default='', max_length=1000),
        ),
    ]