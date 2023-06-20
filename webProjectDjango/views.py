from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
import re
from .models import Employee, Vacation
import json
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from datetime import datetime, date
from django.core.cache import cache

cache.clear()

def index(request):
    return render(request, 'Index.html')


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
    if employeeData["actualVacation"] == "":
        employeeData["actualVacation"] = "0"
    if employeeData["availableVacation"] == "":
        employeeData["availableVacation"] = "0"
    employee = Employee(
        first_name=employeeData['firstName'],
        last_name=employeeData['secondName'],
        email=employeeData['email'],
        address=employeeData['address'],
        id=employeeData['id'],
        phone=employeeData['phone'],
        gender=employeeData['gender'],
        marital_status=employeeData['maritalStatus'],
        vacation_available=employeeData['availableVacation'],
        vacation_actual=employeeData['actualVacation'],
        salary=employeeData['salary'],
        birth_date=employeeData['birthDate']
    )

    employee.save()


@csrf_exempt
def ajax_add_new_employee(request):
    if request.method == 'POST':
        employee = json.loads(request.POST.get('employee'))
        if Employee.objects.filter(id=employee['id']).exists():
            return JsonResponse({'error': 'Employee with this id already exists'})
        if Employee.objects.filter(email=employee['email']).exists():
            return JsonResponse({'error': 'Employee with this email already exists'})
        if Employee.objects.filter(phone=employee['phone']).exists():
            return JsonResponse({'error': 'Employee with this phone already exists'})
        
        addNewEmployeeForm(employee)
        return JsonResponse({'message': 'Data received successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def ajax_search_employee(request):
    if request.method == 'GET':
        name = request.GET.get('name')
        query = Q(first_name__icontains=name)

        # Check if name consists of two words
        if len(name.split()) == 2:
            first_name, last_name = name.split()
            query |= Q(first_name__icontains=first_name, last_name__icontains=last_name)

        employees = Employee.objects.filter(query)
        results = []
        for employee in employees:
            result = {
                'id': employee.id,
                'firstName': employee.first_name,
                'lastName': employee.last_name,
                'phone': employee.phone,
                # Include other desired fields
            }
            results.append(result)
        return JsonResponse(results, safe=False)

def ajax_get_employee_by_id(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        employee = getEmployee(id)
        return JsonResponse(employee, safe=False)

@csrf_exempt
def ajax_edit_employee_info(request):
    if request.method == 'POST':
        editedEmployee = json.loads(request.POST.get('employee'))
        employee = getEmployee(editedEmployee['id'])

        addNewEmployeeForm(editedEmployee)
            
        return JsonResponse({'message': 'Data received successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def ajax_delete_employee(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        Employee.objects.filter(id=id).delete()
        return JsonResponse({'message': 'Data received successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def ajax_save_vacation(request):
    if request.method == 'POST':
        vacation = json.loads(request.POST.get('vacation'))
        return handleSubmitVacation(vacation)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
def handleSubmitVacation(vacationInfo):
    if not (Employee.objects.filter(id=vacationInfo['id']).exists()):
        return JsonResponse({'error': 'Employee does not exist'})

    employee = Employee.objects.get(id=vacationInfo['id'])

    try:
        fromDate = datetime.strptime(vacationInfo['fromDate'], "%Y-%m-%d").date()
        toDate = datetime.strptime(vacationInfo['toDate'], "%Y-%m-%d").date()
        currentDate = date.today()
    except:
        return JsonResponse({"error": 'Invalid date format'})

    if (fromDate >= toDate):
        return JsonResponse({'error': 'Invalid date range'})
    if  (fromDate < currentDate):
        return JsonResponse({'error': 'From date is in the past'})
    
    deltaDays = (toDate - fromDate).days

    if deltaDays > employee.vacation_available:
        return JsonResponse({'error': 'Vacation days exceeded'})
    
    vacation = Vacation(
        employee=employee,
        from_date=fromDate,
        to_date=toDate,
        reason=vacationInfo['reason'],
        status="pending"
    )
    vacation.save()

    return JsonResponse({'message': 'Data received successfully'})

def ajax_get_vacations_by_status(request):
    if request.method == 'GET':
        status = request.GET.get('status')
        if (status == "all"):
            vacations = Vacation.objects.all()
        else:
            vacations = Vacation.objects.filter(status=status)
        result = []
        for vacation in vacations:
            result.append(getVacation(vacation.pk))
        
        
        return JsonResponse(result, safe=False)
        # return JsonResponse({"message": "test"})
    else:
        return JsonResponse({"error": "Invalid request method"})

def getEmployee(id):
    if (Employee.objects.filter(id=id).exists()):
        employee = Employee.objects.get(id=id)
        result = {
                'firstName': employee.first_name,
                'secondName': employee.last_name,
                'email': employee.email,
                'address': employee.address,
                'id': employee.id,
                'phone': employee.phone,
                'gender': employee.gender,
                'maritalStatus': employee.marital_status,
                'availableVacation': employee.vacation_available,
                'actualVacation': employee.vacation_actual,
                'salary': employee.salary,
                'birthDate': employee.birth_date,
        }
        return result
    else:
        return None

def getVacation(id):
    if (Vacation.objects.filter(id=id)).exists():
        vacation = Vacation.objects.get(id=id)
        result = {
            "id": vacation.pk,
            "employeeName": vacation.employee.first_name,
            "employeeID": vacation.employee.id,
            "fromDate": vacation.from_date,
            "toDate": vacation.to_date,
            "status": vacation.status,
            "reason": vacation.reason
        }
        return result
    else:
        return None

@csrf_exempt
def ajax_approve_vacation(request):
    if request.method == "POST":
        id = request.POST.get("id")
        vacation = Vacation.objects.get(pk=id)
        approveVacation(vacation)

        return JsonResponse({"message": "Sucess"})
    else:
        return JsonResponse({"error": "error"})

def approveVacation(vacation: Vacation):
    fromDate = vacation.from_date
    toDate = vacation.to_date
    deltaDate = (toDate - fromDate).days
    vacation.employee.vacation_actual += deltaDate
    vacation.employee.vacation_available -= deltaDate
    vacation.status = "approved"
    vacation.employee.save()
    vacation.save()

@csrf_exempt
def ajax_reject_vacation(request):
    if request.method == "POST":
        id = request.POST.get("id")
        vacation = Vacation.objects.get(pk=id)
        vacation.status = "rejected"
        vacation.save()

        return JsonResponse({"message": "Sucess"})
    else:
        return JsonResponse({"error": "error"}) 
 