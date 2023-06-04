from django.urls import path, include
from .views import (OrganizationRegisterView, 
                    OrganizationDashboardView, AddWorkerView, 
                    WorkersDashboardView, LoginView,
                    )


#API endpoints 
urlpatterns = [
    path('organization/signup', OrganizationRegisterView.as_view()),
    path('organization/signin', LoginView.as_view()),
    path('organization/dashboard', OrganizationDashboardView.as_view()),
    path('add_workers', AddWorkerView.as_view()),
    path('workers/signin', LoginView.as_view()),
    path('workers/dashboard', WorkersDashboardView.as_view())
]
