from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token), str(refresh)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"msg": "User registered"}, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)

        if not user.check_password(password):  # this checks hashed password
            return Response({"error": "Invalid credentials"}, status=400)

        # create JWT tokens here
        refresh = RefreshToken.for_user(user)

        res = Response({"msg": "Login successful"})
        res.set_cookie("access", str(refresh.access_token), httponly=True)
        res.set_cookie("refresh", str(refresh), httponly=True)
        return res

class LogoutView(APIView):
    def post(self, request):
        res = Response({"msg": "Logged out successfully"}, status=200)
        res.delete_cookie("access")
        res.delete_cookie("refresh")
        return res