from django.urls import path
from .views import SubmitTranscriptView, GetTranscriptView, EvaluationListCreateView


urlpatterns = [
    path('submit-transcript/<int:interview_id>/', SubmitTranscriptView.as_view(), name='submit-transcript'),
    path('transcript/<int:interview_id>/', GetTranscriptView.as_view(), name='get-transcript'),
    path("evaluations/", EvaluationListCreateView.as_view(), name="evaluation-list-create"),
]
