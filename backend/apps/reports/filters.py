from django_filters import rest_framework as filters

from .models import Report


class ReportFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    title = filters.CharFilter(field_name="title", lookup_expr="icontains")

    class Meta:
        model = Report
        fields = ["status"]
