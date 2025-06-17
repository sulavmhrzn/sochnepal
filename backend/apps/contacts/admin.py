from django.contrib import admin

from .models import ContactUs


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ["get_full_name", "email", "phone_number", "subject", "created_at"]
    search_fields = ["email", "first_name", "last_name", "subject"]
    list_filter = ["subject"]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    get_full_name.short_description = "full name"
