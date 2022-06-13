from django import forms
from .models import Tracker

class Trackform(forms.ModelForm):
	class meta:
		model = Tracker
		fields = ('tag','category','details','amount','priority')