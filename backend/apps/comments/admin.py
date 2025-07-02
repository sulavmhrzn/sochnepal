from django.contrib import admin

from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["user", "report", "parent", "created_at"]
    list_filter = ["user", "report"]
    search_fields = ["user__email", "report__title"]
