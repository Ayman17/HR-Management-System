from django.db import models

class Employee(models.Model):
    
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')
    MARITAL_STATUS_CHOICES = (
        ('married', 'Married'),
        ('unmarried', 'Unmarried'),
    )
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, default='married')
    vacation_available = models.IntegerField()
    vacation_actual = models.IntegerField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    birth_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Vacation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
    reason = models.CharField(max_length=250)
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')