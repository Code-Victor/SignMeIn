from rest_framework.permissions import BasePermission

class IsOrganization(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_organization)
    
    
class IsWorker(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_worker)