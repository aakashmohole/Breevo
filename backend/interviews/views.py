import requests
from decouple import config
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from .models import Interview, InterviewQuestion
from .serializers import InterviewSerializer, InterviewQuestionSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

OPENROUTER_API_KEY = config('OPENROUTER_API_KEY')

class CreateInterviewView(generics.CreateAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GenerateQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        interview = get_object_or_404(Interview, pk=pk, user=request.user)

        prompt = f"""
        Create an interview with the following:
        - Job Role: {interview.job_role}
        - Industry: {interview.industry}
        - Skills: {interview.key_skills}
        - Focus Areas: {interview.focus_areas}
        - Difficulty: {interview.difficulty}
        - Question Types: {interview.question_types}
        - Time Limit: {interview.time_limit} minutes
        Generate 5 interview questions only in plain text, separated by new lines.
        """

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            }
        )

        if response.status_code != 200:
            return Response({"error": "Failed to generate questions"}, status=500)

        try:
            full_text = response.json()['choices'][0]['message']['content']
            questions = [q.strip("0123456789. ").strip() for q in full_text.strip().split('\n') if q.strip()]
            formatted_questions = [{"question": q, "type": "AI"} for q in questions]
        except Exception as e:
            return Response({"error": "Invalid format", "details": str(e)}, status=500)

        # 1️⃣ Save in Interview.generated_questions
        interview.generated_questions = formatted_questions
        interview.save(update_fields=["generated_questions"])

        # 2️⃣ Save in InterviewQuestion table
        from .models import InterviewQuestion
        for q in formatted_questions:
            InterviewQuestion.objects.create(
                interview=interview,
                question_text=q['question'],
                question_type=q['type']
            )

        return Response({
            "message": "Questions saved in both Interview and InterviewQuestion table.",
            "questions": formatted_questions
        }, status=200)
