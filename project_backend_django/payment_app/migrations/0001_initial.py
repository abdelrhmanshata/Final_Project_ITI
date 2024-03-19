# Generated by Django 4.2.10 on 2024-03-19 19:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courseListAPI', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment_Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentID', models.CharField(max_length=255)),
                ('paymentDate', models.DateField(default=django.utils.timezone.now, null=True)),
                ('course_model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courseListAPI.course')),
                ('user_model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
