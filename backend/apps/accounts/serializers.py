from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region="NP")

    class Meta:
        model = Profile
        fields = ["location", "phone_number"]
