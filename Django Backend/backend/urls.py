from django.urls import path, include
from rest_framework import routers
from .views import UploadViewSet, SectionViewSet, QuizViewSet, AggregatedDataView


router = routers.DefaultRouter()
router.register(r'upload', UploadViewSet, basename="upload")
router.register(r'sections', SectionViewSet)
router.register(r'quizzes', QuizViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('aggregated-data/', AggregatedDataView.as_view(), name='aggregated-data'),
]