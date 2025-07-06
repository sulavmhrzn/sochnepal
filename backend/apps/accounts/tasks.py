from celery import shared_task
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from apps.accounts.models import User


@shared_task
def send_verification_email(user_pk):
    user = User.objects.get(pk=user_pk)
    token = default_token_generator.make_token(user)
    user_id = urlsafe_base64_encode(force_bytes(user.pk))
    context = {
        "first_name": user.first_name,
        "url": f"{settings.FRONTEND_URL}/verify-email?uid={user_id}&token={token}",
    }

    msg_html = render_to_string("verify_email.html", context)
    msg_plain = render_to_string("verify_email.txt", context)
    send_mail(
        subject="Welcome to SochNepal",
        message=msg_plain,
        from_email="admin@sochnepal.com",
        recipient_list=[user.email],
        html_message=msg_html,
    )
