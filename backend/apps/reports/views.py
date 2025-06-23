from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ReportFilter
from .models import Category, Report
from .pagination import ReportPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import CategoryListSerializer, ReportSerializer


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

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def my(self, request):
        queryset = self.filter_queryset(
            self.get_queryset().filter(created_by=request.user)
        )
        serializer = self.serializer_class(
            queryset, many=True, context={"request": request}
        )
        return Response(serializer.data)


class CategoryView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
