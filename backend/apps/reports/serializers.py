from rest_framework import serializers

from apps.accounts.models import User

from .models import Category, Report


class CreatedBySerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.get_full_name()

    class Meta:
        model = User
        fields = ["id", "full_name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class ReportSerializer(serializers.ModelSerializer):
    created_by = CreatedBySerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source="category", queryset=Category.objects.all()
    )

    class Meta:
        model = Report
        fields = [
            "id",
            "title",
            "description",
            "category",
            "category_id",
            "status",
            "image",
            "location_lat",
            "location_lng",
            "address",
            "created_by",
            "created_at",
            "updated_at",
            "is_flagged",
        ]
        read_only_fields = [
            "status",
            "created_at",
            "updated_at",
            "is_flagged",
        ]
        extra_kwargs = {"address": {"required": True}}
