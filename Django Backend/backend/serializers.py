from rest_framework.serializers import Serializer, FileField, ImageField
from rest_framework import serializers
from .models import Section, Quiz


class UploadSerializer(Serializer):
    pdf_file = FileField()
    image_file = ImageField()

    class Meta:
        fields = ['pdf_file', 'image_file']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
        
class AggregatedDataSerializer(serializers.Serializer):
    total_quizzes = serializers.IntegerField()
    average_marks_per_quiz = serializers.FloatField()
    average_marks_per_section = serializers.DictField(child=serializers.FloatField())
    lowest_grade = serializers.IntegerField()
    highest_grade = serializers.IntegerField()        