from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .models import Flag
from .serializers import FlagSerializer


class FlagViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    serializer_class = FlagSerializer
    queryset = Flag.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(flagged_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(flagged_by=self.request.user)
