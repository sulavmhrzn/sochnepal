from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import ContactUsSerializer


class ContactUsView(CreateAPIView):
    serializer_class = ContactUsSerializer
    permission_classes = [AllowAny]
