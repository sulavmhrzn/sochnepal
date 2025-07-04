from django.dispatch import receiver
from djoser.signals import user_registered

from apps.accounts.tasks import send_verification_email

from .models import Profile


@receiver(user_registered)
def create_profile(sender, user, request, **kwargs):
    Profile.objects.get_or_create(user=user)
    send_verification_email.delay(user_pk=user.pk)
