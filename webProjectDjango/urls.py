"""
URL configuration for webProjectDjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add_new, name='add_new'),
    path('employee/', views.employee_info, name='employee_info'),
    path('hr/', views.hr_home, name='hr_home'),
    path('search/', views.search_employee, name='search_employee'),
    path('vacation/', views.vacation, name='vacation'),
    path('vacation/submit/', views.submit_vacation, name='submit_vacation'),
    path('ajax/addNewEmployee', views.ajax_add_new_employee, name='ajax_add_new_employee'),
    path('ajax/searchEmployee', views.ajax_search_employee, name='ajax_search_employee'),
    path('ajax/getEmployeeById', views.ajax_get_employee_by_id, name='ajax_get_employee_by_id'),
    path('ajax/editEmployeeInfo', views.ajax_edit_employee_info, name='ajax_edit_employee_info'),
    path('ajax/deleteEmployee', views.ajax_delete_employee, name='ajax_delete_employee'),
    path('ajax/saveVacation',  views.ajax_save_vacation, name='ajax_save_vacation'),
    path('ajax/getVacationsByStatus',  views.ajax_get_vacations_by_status, name='ajax_get_vacations_by_status'),
    path('ajax/approveVacation',  views.ajax_approve_vacation, name='ajax_approve_vacation'),
    path('ajax/rejectVacation',  views.ajax_reject_vacation, name='ajax_reject_vacation'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
