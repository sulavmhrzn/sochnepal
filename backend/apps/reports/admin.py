from django.contrib import admin

from .models import Category, Report, UpVote


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "get_total_reports"]
    prepopulated_fields = {"slug": ("name",)}

    def get_total_reports(self, obj):
        return obj.reports.count()

    get_total_reports.short_description = "total reports"


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "category",
        "status",
        "created_by",
        "get_upvotes_count",
        "get_flags_count",
        "is_flagged",
        "created_at",
        "updated_at",
    ]
    list_filter = ["is_flagged", "category", "status"]
    search_fields = ["title"]
    readonly_fields = ["created_at", "updated_at"]

    def get_upvotes_count(self, obj):
        return obj.upvotes_count

    get_upvotes_count.short_description = "total up votes"

    def get_flags_count(self, obj):
        return obj.flags.count()

    get_flags_count.short_description = "total flags"


@admin.register(UpVote)
class UpVoteAdmin(admin.ModelAdmin):
    list_display = ["user", "report"]
