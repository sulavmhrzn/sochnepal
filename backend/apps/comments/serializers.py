from rest_framework import serializers

from apps.accounts.models import User

from .models import Comment


class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class CommentSerializer(serializers.ModelSerializer):
    user = CommentUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "report",
            "content",
            # "parent", # TODO
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "created_at", "updated_at"]
