from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from djoser.serializers import UserSerializer as DjoserUserSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apps.accounts.models import User

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region="NP")

    class Meta:
        model = Profile
        fields = ["location", "phone_number"]


class VerifyEmailTokenSerializer(serializers.Serializer):
    token = serializers.CharField()
    uid = serializers.CharField()

    def validate(self, attrs):
        token = attrs.get("token")
        uid = attrs.get("uid")
        try:
            user = User.objects.get(pk=force_str(urlsafe_base64_decode(uid)))
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
            raise ValidationError("invalid or expired token")
        valid_token = default_token_generator.check_token(user, token)
        if not user:
            raise ValidationError("invalid or expired token")
        if not valid_token:
            raise ValidationError("invalid or expired token")
        if user.is_verified:
            raise ValidationError("user is already verified")
        attrs["user"] = user
        return attrs

    def save(self, **kwargs):
        user = self.validated_data.get("user")
        user.is_verified = True
        user.save(update_fields=["is_verified"])
        return user


class UserSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = DjoserUserSerializer.Meta.fields + ("is_verified",)
