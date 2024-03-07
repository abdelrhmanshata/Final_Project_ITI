from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .filters import StudentsFilter
from .serializers import StudentSerializer
from .models import Student


# Create your views here.
@api_view(['GET', 'POST'])
def get_all_students(request, format=None):
    if request.method == 'GET':
        # stud = Student.objects.all()
        filterSet = StudentsFilter(request.GET, queryset=Student.objects.all().order_by('id'))
        # serializer = StudentSerializer(stud, many=True)
        serializer = StudentSerializer(filterSet.qs, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def get_student(request, pk, format=None):
    try:
        test = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentSerializer(test)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StudentSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
