from rest_framework import serializers

from apps.accounts.models import User

from .models import Category, Report, UpVote


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "name_nepali", "color", "report_count"]


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
        fields = ["id", "name", "slug", "name_nepali", "color"]


class ReportSerializer(serializers.ModelSerializer):
    created_by = CreatedBySerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source="category", queryset=Category.objects.all()
    )
    up_votes = serializers.SerializerMethodField()
    has_upvoted = serializers.SerializerMethodField()
    has_reported = serializers.SerializerMethodField()

    def get_up_votes(self, obj):
        if hasattr(obj, "total_upvotes"):
            return obj.total_upvotes
        return obj.upvotes_count

    def get_has_upvoted(self, obj):
        user = self.context["request"].user

        if hasattr(obj, "user_upvoted"):
            return obj.user_upvoted
        return (
            obj.upvotes.filter(user=user).exists() if user.is_authenticated else False
        )

    def get_has_reported(self, obj):
        user = self.context["request"].user

        if hasattr(obj, "user_flagged"):
            return obj.user_flagged
        return (
            obj.flags.filter(flagged_by=user).exists()
            if user.is_authenticated
            else False
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
            "up_votes",
            "has_upvoted",
            "has_reported",
        ]
        read_only_fields = [
            "status",
            "created_at",
            "updated_at",
            "is_flagged",
        ]
        extra_kwargs = {"address": {"required": True}}


class UpVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpVote
        fields = ["report", "user"]
        read_only_fields = ["user"]

    def create(self, validated_data):
        data, created = UpVote.objects.get_or_create(
            report=validated_data["report"], user=validated_data["user"]
        )
        print(
            UpVote.objects.get_or_create(
                report=validated_data["report"], user=validated_data["user"]
            )
        )
        if created:
            return data
        data.delete()
        return data
