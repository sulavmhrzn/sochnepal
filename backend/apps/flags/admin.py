from django.contrib import admin

from .models import Flag


@admin.register(Flag)
class FlagAdmin(admin.ModelAdmin):
    list_display = [
        "report",
        "flagged_by",
        "reason",
        "created_at",
        "is_resolved",
        "action_taken",
    ]

    list_filter = ["is_resolved", "reason", "report"]
