from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from apps.permissions import IsCommentOwnerOrReadOnly, IsVerifiedUserOrReadOnly
from apps.reports.models import Report

from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsCommentOwnerOrReadOnly,
        IsVerifiedUserOrReadOnly,
    ]

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(report=self.kwargs["report_pk"])
            .select_related("report", "user")
            .order_by("-created_at")
        )

    def list(self, request, *args, **kwargs):
        get_object_or_404(Report, pk=self.kwargs["report_pk"])
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
