from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import UploadSerializer, SectionSerializer, QuizSerializer
from pdf2image import convert_from_path
from vertexai.generative_models import GenerativeModel, Image
from tempfile import NamedTemporaryFile
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Section, Quiz

from rest_framework.views import APIView
from .serializers import AggregatedDataSerializer
from django.db.models import Avg, Min, Max

class AggregatedDataView(APIView):

    def get(self, request):
        total_quizzes = Quiz.objects.count()
        average_marks_per_quiz = Quiz.objects.aggregate(average=Avg('o_marks'))['average'] or 0
        lowest_grade = Quiz.objects.aggregate(lowest=Min('o_marks'))['lowest'] or 0
        highest_grade = Quiz.objects.aggregate(highest=Max('o_marks'))['highest'] or 0
        
        sections = Section.objects.all()
        average_marks_per_section = {}
        for section in sections:
            average_marks = Quiz.objects.filter(section=section).aggregate(average=Avg('o_marks'))['average'] or 0
            average_marks_per_section[section.name] = average_marks
        
        aggregated_data = {
            'total_quizzes': total_quizzes,
            'average_marks_per_quiz': average_marks_per_quiz,
            'average_marks_per_section': average_marks_per_section,
            'lowest_grade': lowest_grade,
            'highest_grade': highest_grade,
        }
        
        serializer = AggregatedDataSerializer(aggregated_data)
        return Response(serializer.data)

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    @action(detail=False, methods=['get'], url_path='by-teacher/(?P<teacher_id>[^/.]+)')
    def list_by_teacher(self, request, teacher_id=None):
        sections = Section.objects.filter(teacherID=teacher_id)
        serializer = self.get_serializer(sections, many=True)
        return Response(serializer.data)

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @action(detail=False, methods=['get'], url_path='by-section/(?P<section_id>[^/.]+)')
    def list_by_section(self, request, section_id=None):
        quizzes = Quiz.objects.filter(section_id=section_id)
        serializer = self.get_serializer(quizzes, many=True)
        return Response(serializer.data)


class UploadViewSet(ViewSet):
    

    serializer_class = UploadSerializer

    def list(self, request):
        return Response("GET API")

    def create(self, request):
        pdf_file = request.FILES.get('pdf_file')
        image_file = request.FILES.get('image_file')

        if pdf_file and image_file:
            try:
               
                with NamedTemporaryFile(delete=False, suffix=".pdf") as pdf_temp:
                    for chunk in pdf_file.chunks():
                        pdf_temp.write(chunk)
                    pdf_temp_path = pdf_temp.name

                with NamedTemporaryFile(delete=False, suffix=".jpeg") as image_temp:
                    for chunk in image_file.chunks():
                        image_temp.write(chunk)
                    image_temp_path = image_temp.name

              
                images = convert_from_path(pdf_temp_path, dpi=300)

              
                vision_model = GenerativeModel("gemini-pro-vision")

                
                Cimage = Image.load_from_file(image_temp_path)
                Correctanswers_response = vision_model.generate_content(["Extract all 20 answers from the numbering into a list?", Cimage]).text
                Correctanswers = Correctanswers_response.split('\n')
                Correctanswers = [answer.strip() for answer in Correctanswers if answer.strip()]  # Remove empty lines
                Correctanswers = [answer.split('. ')[1] for answer in Correctanswers if '. ' in answer]  # Extract answer text after numbering

                all_answers = []
                for i, img in enumerate(images):
                    img_file = f'Quiz_page_{i+1}.jpeg'
                    img.save(img_file, 'JPEG')
                    image = Image.load_from_file(img_file)
                    prompt = f"Extract all 20 answers from the numbering into a list and compare them with {Correctanswers}. Return only Obtained marks Integer value and Name in this Format Name: Obtained:  for page {i+1}."
                    response = vision_model.generate_content([prompt, image])
                    

                    extracted_answers = response.text.split('\n')
                    extracted_answers = [answer.strip() for answer in extracted_answers if answer.strip()]  # Remove empty lines
                    extracted_answers = [answer.split('. ')[1] for answer in extracted_answers if '. ' in answer]  # Extract answer text after numbering
                    all_answers.append((i+1, extracted_answers))

                final_response = {
                    'all_answers': all_answers
                
                }

                return Response(final_response)

            except Exception as e:
                return Response({'error': str(e)}, status=500)
        else:
            return Response({'error': 'Both PDF file and image file are required'}, status=400)