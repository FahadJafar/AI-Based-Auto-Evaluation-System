from django.db import models

class Section(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    strength = models.IntegerField()
    totalQuizzes = models.IntegerField()
    teacherID = models.CharField(max_length=100)
