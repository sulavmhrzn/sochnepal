from rest_framework import serializers

from .models import ContactUs


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = [
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "subject",
            "message",
        ]
