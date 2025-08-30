from django.db import models
from django.contrib.auth import get_user_model
from interviews.models import Interview


User = get_user_model()

class Transcript(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interview = models.ForeignKey(Interview, on_delete=models.CASCADE)
    transcript_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transcript for {self.interview} by {self.user.email}"


class Evaluation(models.Model):
    interview = models.OneToOneField(Interview, on_delete=models.CASCADE, related_name="evaluation")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="evaluations")

    score = models.IntegerField()  # e.g. 85
    performance_summary = models.TextField()
    transcript_analysis = models.TextField()
    sentiment = models.CharField(max_length=20)  # Neutral / Positive / Negative
    confidence = models.CharField(max_length=20)  # High / Medium / Low
    eye_contact = models.CharField(max_length=50, null=True, blank=True)  # "Good (70%)"
    posture = models.CharField(max_length=50, null=True, blank=True)
    gestures = models.CharField(max_length=50, null=True, blank=True)
    keywords_used = models.JSONField(default=list, blank=True)
    suggested_keywords = models.JSONField(default=list, blank=True)
    improvement_areas = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evaluation ({self.score}%) - {self.interview.job_role}"
