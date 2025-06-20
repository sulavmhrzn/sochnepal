from django.contrib import admin

from .models import Category, Report


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
        "is_flagged",
        "created_at",
        "updated_at",
    ]
    list_filter = ["is_flagged", "category", "status"]
    search_fields = ["title"]
    readonly_fields = ["created_at", "updated_at"]
