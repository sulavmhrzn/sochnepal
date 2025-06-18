from apps.accounts.views import LogoutView, TokenObtainPairViewCookie
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/",
        include(
            [
                path("auth/", include("djoser.urls")),
                path("auth/", include("djoser.urls.jwt")),
                path("auth/jwt/cookie/", TokenObtainPairViewCookie.as_view()),
                path("auth/logout/", LogoutView.as_view()),
                path("accounts/", include("apps.accounts.urls")),
                path("contact-us/", include("apps.contacts.urls")),
            ]
        ),
    ),
]
