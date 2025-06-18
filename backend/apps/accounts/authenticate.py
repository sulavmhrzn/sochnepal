from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieAuthentication(JWTAuthentication):
    """
    Custom authentication method that extends JWTAuthentication
    """

    def authenticate(self, request: Request, *args, **kwargs):
        """
        Authenticate token using cookie, fallback to authorization header
        """
        header = self.get_header(request)
        if header is None:
            raw_token = request.COOKIES.get("access_token") or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
