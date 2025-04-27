from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=15)
    image = models.TextField()

class KeyValue(models.Model):
    key = models.CharField(max_length=32, unique=True, null=False, blank=False)
    value = models.TextField(null=False, blank=False)
    html = models.BooleanField(default=False)