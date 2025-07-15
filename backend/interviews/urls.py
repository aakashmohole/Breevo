from django.urls import path
from .views import CreateInterviewView, GenerateQuestionsView

urlpatterns = [
    path('create/', CreateInterviewView.as_view(), name='create-interview'),
    path('<int:pk>/generate-questions/', GenerateQuestionsView.as_view(), name='generate-questions'),
]
