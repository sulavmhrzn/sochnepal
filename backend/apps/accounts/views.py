from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Profile
from .serializers import (
    ProfileSerializer,
    VerifyEmailTokenSerializer,
)
from .tasks import send_verification_email


class ProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Profile, user=self.request.user)

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_object())
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            instance=self.get_object(), data=request.data
        )
        if not serializer.is_valid():
            return Response(serializer.errors)
        serializer.save()
        return Response(serializer.data)


class TokenObtainPairViewCookie(TokenObtainPairView):
    """
    View that stores the generated token in cookie.
    """

    def post(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        response = Response(status=201)
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=serializer.validated_data["access"],
            max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        return response


class LogoutView(GenericAPIView):
    """
    This view simply deletes the cookie
    """

    def post(self, request):
        response = Response(status=200)
        response.delete_cookie(key=settings.SIMPLE_JWT["AUTH_COOKIE"])
        return response


class VerifyEmailView(GenericAPIView):
    serializer_class = VerifyEmailTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ResendVerificationEmailView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.is_verified:
            return Response(data={"message": "email already verified"}, status=400)
        send_verification_email.delay(user_pk=request.user.pk)
        return Response(status=200)
