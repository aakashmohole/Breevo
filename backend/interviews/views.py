import requests
from decouple import config
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from .models import Interview, InterviewQuestion
from .serializers import InterviewSerializer, InterviewQuestionSerializer
from rest_framework.generics import (ListAPIView, RetrieveUpdateAPIView ,RetrieveAPIView,
                                     DestroyAPIView)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache


OPENROUTER_API_KEY = config('OPENROUTER_API_KEY')

class CreateInterviewView(generics.CreateAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def perform_create(self, serializer):
        interview = serializer.save(user=self.request.user)
        cache.delete(f"user_interviews_{self.request.user.id}")

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
        print(response.status_code, response)  # Debugging line to check API response
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


class UserAllInterviewsView(ListAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     return Interview.objects.filter(user=self.request.user)
    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        cache_key = f"user_interviews_{user_id}"
        cached_data = cache.get(cache_key)
        
        if cached_data:
            
            return Response(cached_data)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Save in Redis cache for 5 minutes (300 seconds)
        cache.set(cache_key, data, timeout=300)
        return Response(data)

    def get_queryset(self):
        return Interview.objects.filter(user=self.request.user)
    
class IncompleteInterviewsView(ListAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        cache_key = f"user_incomplete_interviews_{user_id}"
        cached_data = cache.get(cache_key)
        print("Cache hit!", cache_key)
        if cached_data:
            print("Cache hit!")
            return Response(cached_data)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        cache.set(cache_key, data, timeout=300)
        return Response(data)

    def get_queryset(self):
        return Interview.objects.filter(user=self.request.user, is_completed=False)
    
class InterviewUpdateView(RetrieveUpdateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Limit to interviews owned by logged-in user, for security
        return Interview.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        interview = serializer.save()
        user_id = self.request.user.id
        cache.delete(f"user_interviews_{user_id}")
        cache.delete(f"user_incomplete_interviews_{user_id}")
    
class IncompleteInterviewDetailView(RetrieveAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Interview.objects.filter(user=self.request.user, is_completed=False)

    def retrieve(self, request, *args, **kwargs):
        interview_id = self.kwargs['pk']
        cache_key = f"incomplete_interview_detail_{interview_id}"
        cached_data = cache.get(cache_key)
        print("Cache hit!", cache_key)
        if cached_data:
            print("Cache hit!")
            return Response(cached_data)

        # If not in cache, get from DB and cache it
        interview = self.get_object()
        serializer = self.get_serializer(interview)
        data = serializer.data
        cache.set(cache_key, data, timeout=300)  # 5 mins cache
        return Response(data)

class IncompleteInterviewDeleteView(DestroyAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow deleting user's incomplete interviews
        return Interview.objects.filter(user=self.request.user, is_completed=False)

    def perform_destroy(self, instance):
        # Delete instance
        instance.delete()
        # Invalidate cache for this interview detail
        cache_key = f"incomplete_interview_detail_{instance.id}"
        cache.delete(cache_key)
        # Invalidate any related user interview lists cache keys if necessary
        cache.delete(f"user_incomplete_interviews_{self.request.user.id}")
        cache.delete(f"user_interviews_{self.request.user.id}")

    def delete(self, request, *args, **kwargs):
        # Optionally customize response after delete
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Incomplete interview deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
