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
    image = models.TextField(null=True, blank=True)

class Experience(models.Model):
    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100, default='PRESENT')
    description = models.TextField()

class Skills(models.Model):
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=100)

class ExperienceSkillsMap(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)

class ExperiencePoint(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
    point = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

class Education(models.Model):
    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100, default='PRESENT')
    description = models.TextField()

class EducationPoint(models.Model):
    education = models.ForeignKey(Education, on_delete=models.CASCADE)
    point = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

class Projects(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    link = models.URLField(max_length=200)
    image_name = models.CharField(max_length=100, null=True, blank=True)
    image = models.TextField(null=True, blank=True)
    image_ext = models.CharField(max_length=10, null=True, blank=True)

class ProjectPoint(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    point = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

class ProjectStack(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    stack = models.CharField(max_length=100)

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    photo = models.TextField(null=True, blank=True)
    photo_ext = models.CharField(max_length=10, null=True, blank=True)
    company = models.CharField(max_length=100, null=True)
    position = models.CharField(max_length=100)
    message = models.TextField()
    favourites = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)

