from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Profile, User


class ProfileInline(admin.StackedInline):
    model = Profile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ["id", "email", "first_name", "last_name", "is_verified"]
    inlines = [ProfileInline]

    ordering = ["id"]
    fieldsets = (
        (None, {"fields": ("email", "password", "is_verified")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    list_filter = ("is_staff", "is_superuser", "is_active", "is_verified", "groups")
    search_fields = ("first_name", "last_name", "email")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "phone_number", "location"]
