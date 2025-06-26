from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ReportFilter
from .models import Category, Report, UpVote
from .pagination import ReportPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import CategoryListSerializer, ReportSerializer, UpVoteSerializer


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


class UpVoteView(GenericAPIView):
    serializer_class = UpVoteSerializer
    queryset = UpVote.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
