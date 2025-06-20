from apps.accounts.views import LogoutView, TokenObtainPairViewCookie
from django.conf import settings
from django.conf.urls.static import static
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
                path("reports/", include("apps.reports.urls")),
            ]
        ),
    ),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
