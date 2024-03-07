import django_filters
from .models import Student


class StudentsFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = Student
        fields = ['educationstage', 'address', 'classroom', 'name']
