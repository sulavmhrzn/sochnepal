from rest_framework import serializers

from apps.exceptions import ConflictException

from .models import Flag


class FlagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flag
        fields = [
            "report",
            "flagged_by",
            "reason",
            "description",
            "is_resolved",
            "resolved_at",
            "action_taken",
            "created_at",
        ]
        read_only_fields = [
            "flagged_by",
            "is_resolved",
            "resolved_at",
            "action_taken",
        ]

    def save(self, **kwargs):
        flagged_by = kwargs.get("flagged_by")
        report = self._validated_data.get("report")
        if Flag.objects.filter(flagged_by=flagged_by, report=report).exists():
            raise ConflictException(detail="You have already flagged this report.")
        super().save(**kwargs)
