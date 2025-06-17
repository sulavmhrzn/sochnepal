from django.dispatch import receiver
from djoser.signals import user_registered

from .models import Profile


@receiver(user_registered)
def create_profile(sender, user, request, **kwargs):
    Profile.objects.get_or_create(user=user)
