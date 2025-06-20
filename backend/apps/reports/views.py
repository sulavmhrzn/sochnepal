from django_filters import rest_framework as filters
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .filters import ReportFilter
from .models import Report
from .pagination import ReportPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import ReportSerializer


class ReportViewSet(ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Report.objects.select_related("category", "created_by").all()
    parser_classes = [JSONParser, MultiPartParser]
    pagination_class = ReportPagination
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ReportFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
