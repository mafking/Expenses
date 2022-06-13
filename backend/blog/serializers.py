from rest_framework import serializers
from .models import Tracker

class serial(serializers.ModelSerializer):
	class Meta:
		model = Tracker
		fields= ('id','tag','category','priority','details','amount')