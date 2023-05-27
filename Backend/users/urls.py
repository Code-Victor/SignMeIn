from django.urls import path, include
from .views import OrganizationRegisterView, OrganizationLoginView

#API endpoints 
urlpatterns = [
    path('signup/organization', OrganizationRegisterView.as_view()),
    path('signin/organization', OrganizationLoginView.as_view())
]