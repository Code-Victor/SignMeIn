from django.urls import path, include
from .views import OrganizationRegisterView

urlpatterns = [
    path('signup/organization', OrganizationRegisterView.as_view())
]