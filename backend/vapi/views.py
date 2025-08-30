from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import generics, permissions
from interviews.models import Interview
from .models import Transcript, Evaluation
from .serializers import TranscriptSerializer, EvaluationSerializer

class SubmitTranscriptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, interview_id):
        user = request.user
        transcript_text = request.data.get('transcript_text')

        try:
            interview = Interview.objects.get(id=interview_id, user=user)
        except Interview.DoesNotExist:
            return Response({"detail": "Interview not found."}, status=status.HTTP_404_NOT_FOUND)

        # Save the transcript
        transcript = Transcript(user=user, interview=interview, transcript_text=transcript_text)
        transcript.save()

        # Mark interview as complete
        interview.is_completed = True
        interview.save()

        serializer = TranscriptSerializer(transcript)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class GetTranscriptView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, interview_id):
        user = request.user
        
        try:
            interview = Interview.objects.get(id=interview_id, user=user)
        except Interview.DoesNotExist:
            return Response({"detail": "Interview not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            transcript = Transcript.objects.get(user=user, interview=interview)
        except Transcript.DoesNotExist:
            return Response({"detail": "Transcript not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "id" :transcript.id,
            "interview_id": interview_id,
            "transcript_text": transcript.transcript_text,
            "created_at": transcript.created_at,
        }, status=status.HTTP_200_OK)
        
        

class EvaluationListCreateView(generics.ListCreateAPIView):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Evaluation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

