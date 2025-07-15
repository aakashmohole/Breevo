from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access')
        if not access_token:
            return None

        try:
            valid_token = AccessToken(access_token)
            user_id = valid_token['user_id']
            user = User.objects.get(id=user_id)
        except Exception:
            raise AuthenticationFailed("Invalid token")

        return (user, None)
