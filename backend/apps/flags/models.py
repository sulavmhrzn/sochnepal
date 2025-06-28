from django.db import models
from django.utils import timezone

from apps.accounts.models import User
from apps.reports.models import Report


class ReasonChoices(models.TextChoices):
    SPAM = ("spam", "Spam or fake")
    OFFENSIVE = ("offensive", "Offensive content")
    DUPLICATE = ("duplicate", "Duplicate report")
    OTHER = ("other", "Other")


class ActionTakenChoices(models.TextChoices):
    REPORT_REMOVED = ("report_removed", "Report removed")
    USER_WARNED = ("user_warned", "User warned")
    NO_ACTION = ("no_action", "No action")


class Flag(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name="flags")
    flagged_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="report_flags"
    )
    reason = models.CharField(max_length=255, choices=ReasonChoices.choices)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(blank=True, null=True)
    action_taken = models.CharField(
        max_length=255,
        choices=ActionTakenChoices.choices,
        default=ActionTakenChoices.NO_ACTION,
    )

    class Meta:
        verbose_name = "flag"
        verbose_name_plural = "flags"
        constraints = [
            models.UniqueConstraint(
                "report", "flagged_by", name="unique_report_flagged_by"
            )
        ]

    def save(self, *args, **kwargs):
        if self.is_resolved:
            self.resolved_at = timezone.now()
        super().save(*args, **kwargs)
