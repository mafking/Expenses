from django.shortcuts import render
from rest_framework import viewsets
from .serializers import serial
from .models import Tracker

# Create your views here.
class View(viewsets.ModelViewSet):
	serializer_class= serial
	queryset = Tracker.objects.all()
