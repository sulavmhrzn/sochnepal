from rest_framework import pagination


class ReportPagination(pagination.PageNumberPagination):
    page_size = 10
