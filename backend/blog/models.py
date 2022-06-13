from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.

class Post(models.Model):
	author =models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
	title = models.CharField(max_length=200)
	text = models.TextField()
	created_date = models.DateTimeField(default=timezone.now)
	pub_date =models.DateTimeField(blank=True,null=True)


	def __str__(self):
		return self.title
		
	def publish(self):
		self.pub_date = timezone.now()
		self.save()

class Tracker(models.Model):
	tag = models.CharField(max_length=100)
	category = models.CharField(max_length = 100)
	details=models.CharField(max_length=300)
	amount= models.IntegerField(default=0)
	priority = models.BooleanField(default=True)

	def __str__(self):
		return self.tag
