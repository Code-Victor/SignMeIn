from django.urls import path, include
from .views import (OrganizationRegisterView, OrganizationLoginView,
                 OrganizationDashboardView
                    )

#API endpoints 
urlpatterns = [
    path('organization/signup', OrganizationRegisterView.as_view()),
    path('organization/signin', OrganizationLoginView.as_view()),
    path('organization/dashboard', OrganizationDashboardView.as_view()),
    # path('add_workers', AddWorkerView.as_view({'post': 'create'}))
]