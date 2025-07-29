from django.urls import path
from .views import (CreateInterviewView, GenerateQuestionsView,
                    IncompleteInterviewsView,UserAllInterviewsView,
                    InterviewUpdateView, IncompleteInterviewDetailView, 
                    IncompleteInterviewDeleteView)

urlpatterns = [
    path('create/', CreateInterviewView.as_view(), name='create-interview'),
    path('<int:pk>/generate-questions/', GenerateQuestionsView.as_view(), name='generate-questions'),
    path('incomplete-interview/', IncompleteInterviewsView.as_view(), name='incomplete-interviews'),
    path('incomplete-interview/<int:pk>/',IncompleteInterviewDetailView.as_view(), name='incomplete-interview-detail'),
    path('incomplete-interview/<int:pk>/delete/', IncompleteInterviewDeleteView.as_view(), name='incomplete-interview-delete'),
    path('all-interviews/', UserAllInterviewsView.as_view(), name='user-all-interviews'),
    path('update-interview/<int:pk>/', InterviewUpdateView.as_view(), name='interview-update'),
]
