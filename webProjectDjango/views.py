from django.shortcuts import render, redirect
from django.contrib import messages
import re
from .models import Employee

def index(request):
    return render(request, 'Index.html')

def add_new(request):
    return render(request, 'addNew.html')

def employee_info(request):
    return render(request, 'empInfo.html')

def hr_home(request):
    return render(request, 'HrHome.html')

def search_employee(request):
    return render(request, 'search_emp.html')

def vacation(request):
    return render(request, 'vacation.html')

def submit_vacation(request):
    return render(request, 'submittedVacations.html')

def add_new(request):
    if request.method == 'POST':
        # Retrieve form data from the request
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        address = request.POST.get('address')
        id = request.POST.get('id')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        marital_status = request.POST.get('marital_status')
        vacation_available = request.POST.get('vacation_available')
        vacation_actual = request.POST.get('vacation_actual')
        salary = request.POST.get('salary')
        birth_date = request.POST.get('birth_date')

        employee = Employee(
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            id=id,
            phone=phone,
            gender=gender,
            marital_status=marital_status,
            vacation_available=vacation_available,
            vacation_actual=vacation_actual,
            salary=salary,
            birth_date=birth_date
        )

        employee.save()

        return redirect('hr_home')

    return render(request, 'addNew.html')

