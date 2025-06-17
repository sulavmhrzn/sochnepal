from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class ContactUs(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = PhoneNumberField()
    subject = models.CharField(
        max_length=50,
        choices=[
            ("general_inquiry", "General Inquiry"),
            ("technical_support", "Technical Support"),
            ("partnership", "Partnership"),
            ("feedback", "Feedback"),
            ("press", "Press"),
        ],
        default="general_inquiry",
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "contact us"
        verbose_name_plural = "contact us"
