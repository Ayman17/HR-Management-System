from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
import re
from .models import Employee
import json
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'Index.html')

# def add_new(request):
#     return render(request, 'addNew.html')

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
    return render(request, 'addNew.html')

def addNewEmployeeForm(employeeData):
    employee = Employee(
        first_name=employeeData['firstName'][0],
        last_name=employeeData['secondName'][0],
        email=employeeData['email'][0],
        address=employeeData['address'][0],
        id=employeeData['id'][0],
        phone=employeeData['phone'][0],
        gender=employeeData['gender'][0],
        marital_status=employeeData['maritalStatus'][0],
        vacation_available=employeeData['availableVacation'][0],
        vacation_actual=employeeData['actualVacation'][0],
        salary=employeeData['salary'][0],
        birth_date=employeeData['birthDate'][0]
    )

    employee.save()
    print("should be added man")


@csrf_exempt
def ajax_add_new_employee(request):
    if request.method == 'POST':
        employee = dict(request.POST)
        print(employee)
        addNewEmployeeForm(employee)
        return JsonResponse({'message': 'Data received successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def ajax_search_employee(request):
    print("hello")
    if request.method == 'GET':
        name = request.GET.get('name')
        employees = Employee.objects.filter(first_name=name)
        results = []
        for employee in employees:
            employee_data = {
                'id': employee.id,
                'firstName': employee.first_name,
                'phone': employee.phone,
            }
            results.append(employee_data)
            pass
        return JsonResponse(results, safe=False)

# def search_employee(request):
#     if request.method == 'GET':
#         name = request.GET.get('name')
#         query = Q(first_name__icontains=name)

#         # Check if name consists of two words
#         if len(name.split()) == 2:
#             first_name, last_name = name.split()
#             query |= Q(first_name__icontains=first_name, last_name__icontains=last_name)

#         employees = Employee.objects.filter(query)
#         results = []
#         for employee in employees:
#             result = {
#                 'first_name': employee.first_name,
#                 'last_name': employee.last_name,
#                 'email': employee.email,
#                 # Include other desired fields
#             }
#             results.append(result)
#         return JsonResponse(results, safe=False)
