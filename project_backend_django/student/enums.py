from django.db import models


class EducationStage(models.TextChoices):
    Prekindergarten = "Pre-kindergarten"
    Kindergarten = "Kindergarten"
    ElementarySchool = "Elementary School"
    HighSchool = "High School"
    College = "College"
    VocationalEducationPrograms = "Vocational Education Programs"

