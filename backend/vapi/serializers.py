from rest_framework import serializers
from .models import Transcript, Evaluation

class TranscriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transcript
        fields = ['id', 'transcript_text']

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = "__all__"
        read_only_fields = ["id", "created_at", "user"]
