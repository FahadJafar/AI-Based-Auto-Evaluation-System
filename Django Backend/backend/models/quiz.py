from django.db import models
from .section import Section

class Quiz(models.Model):
    name = models.CharField(max_length=100)
    o_marks = models.IntegerField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='quizzes')
