from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()

class Interview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job_role = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    key_skills = models.TextField(help_text="Comma-separated")
    focus_areas = models.TextField()
    difficulty = models.CharField(max_length=20, choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')])
    question_types = models.JSONField(help_text="List of types like ['behavioral', 'technical']")
    time_limit = models.IntegerField(help_text="In minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    generated_questions = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.job_role} Interview for {self.user.email}"
    
class InterviewQuestion(models.Model):
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
