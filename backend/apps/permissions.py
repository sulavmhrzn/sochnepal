from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsCommentOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user


class IsVerifiedUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return (
            request.user and request.user.is_authenticated and request.user.is_verified
        )
