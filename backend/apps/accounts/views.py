from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Profile, user=self.request.user)

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.get_object())
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            instance=self.get_object(), data=request.data
        )
        if not serializer.is_valid():
            return Response(serializer.errors)
        serializer.save()
        return Response(serializer.data)
