from django.urls import path, include, re_path
from .views import (OrganizationRegisterView, 
                    OrganizationDashboardView, AddWorkerView, 
                    WorkersDashboardView, LoginView, ClockInView,
                    ClockOutView, WorkersDetailView, 
                    AttendanceDetailView, GenerateQrcodeView, GetQrcodeIdView
                    )

#API endpoints 
urlpatterns = [
    path('organization/signup', OrganizationRegisterView.as_view()),
    path('organization/signin', LoginView.as_view()),
    path('organization/dashboard', OrganizationDashboardView.as_view()),
    path('add_workers', AddWorkerView.as_view()),
    path('workers/signin', LoginView.as_view()),
    path('workers/dashboard', WorkersDashboardView.as_view()),
    path('clock_in', ClockInView.as_view()),
    path('organization/<int:organization_id>/list_workers', WorkersDetailView.as_view()),
    path('clock_out/<int:qrcode_id>', ClockOutView.as_view()),
    path('worker/attendance_history', AttendanceDetailView.as_view()),
    path('organization/<int:organization_id>/generate_code', GenerateQrcodeView.as_view()),
    path('scan_code/<int:organization_id>', GetQrcodeIdView.as_view())
]