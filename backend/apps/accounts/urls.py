from django.urls import path

from .views import ProfileView, ResendVerificationEmailView, VerifyEmailView

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("email/verify/", VerifyEmailView.as_view(), name="verify-email"),
    path(
        "email/verify/resend/",
        ResendVerificationEmailView.as_view(),
        name="resend-verification-email",
    ),
]
