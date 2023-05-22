// change the values of edit page to the required one to edit
let eID = localStorage.getItem('editID');
document.getElementById("id").value = eID;
document.getElementById("first_name").value = JSON.parse(localStorage.getItem(eID)).firstName;
document.getElementById("last_name").value = JSON.parse(localStorage.getItem(eID)).secondName;
document.getElementById("email").value = JSON.parse(localStorage.getItem(eID)).email;
document.getElementById("address").value = JSON.parse(localStorage.getItem(eID)).address;
document.getElementById("phone").value = JSON.parse(localStorage.getItem(eID)).phone;
let empVacations = localStorage.getItem(eID).vacations;

if (JSON.parse(localStorage.getItem(eID)).gender === 'male')
    document.querySelector("#male").checked = true;
else
    document.querySelector("#female").checked = true;

if (JSON.parse(localStorage.getItem(eID)).maritalStatus === 'married')
    document.querySelector("#married").checked = true;
else
    document.querySelector("#unmarried").checked = true;

document.getElementById("vacation_actual").value = JSON.parse(localStorage.getItem(eID)).actualVacation;
document.getElementById("vacation").value = JSON.parse(localStorage.getItem(eID)).availableVacation;
document.getElementById("salary").value = JSON.parse(localStorage.getItem(eID)).salary;
document.getElementById("birth_date").value = JSON.parse(localStorage.getItem(eID)).birthDate;


// edit validation
const submitButton = document.getElementById('submit');
const formElement = document.getElementById('form');
const deleteButton = document.getElementById('deleteButton');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxDate = new Date()
const minDate = new Date("1900-1-1");
const phoneNumberRegex = /^01{1}[0125]{1}\d{8}/;

const errorMessages = {
    2: "Not vaild employee information",
    3: "Some input fields are messing",
}

const statusCodes = {
    valid: 1,
    wrong: 2,
    messing: 3,
};

function stopDefaultSubmit(e) {
    e.preventDefault();
}

function addNewEmployee() {
    const employee = {
        id: document.getElementById("id").value,
        firstName: document.getElementById("first_name").value,
        secondName: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        gender: document.querySelector("input[name=gender]:checked").value,
        maritalStatus: document.querySelector("input[name=marital_status]:checked").value,
        availableVacation: document.getElementById("vacation").value,
        actualVacation: document.getElementById("vacation_actual").value,
        salary: document.getElementById("salary").value,
        birthDate: document.getElementById("birth_date").value,
        vacations: JSON.parse(localStorage.getItem(eID)).vacations,
    };
    const infoValidation = isValidEmployee(employee)
    if (infoValidation == statusCodes.valid){

        // happy scenario
        localStorage.setItem(employee.id, JSON.stringify(employee));
        const contentDiv = document.getElementById("content_div");

        const myH3 = document.createElement('h3');
        myH3.textContent = 'Employee info updated successfully :)';
        contentDiv.append(myH3);
        contentDiv.append(document.createElement('br'));

        const myButton = document.createElement('button');
        myButton.textContent = 'Edit another employee';
        myButton.setAttribute("onclick", "research()");
        contentDiv.append(myButton);

        contentDiv.classList.add('centered_data')
        document.getElementById("edit_div").style.display = 'none';
    }else {
        alert(errorMessages[infoValidation]);
    }
}

function getEmployeeInfo(id) {
    const employee = localStorage.getItem(id);
    return employee;
}

function isValidEmployee(employee){
    if (emailRegex.test(employee.email) == false){
        return statusCodes.wrong;
    }

    if (phoneNumberRegex.test(employee.phone) == false){
        return statusCodes.wrong;
    }

    const employeeBirhDate = new Date(employee.birthDate)
    if (employeeBirhDate > maxDate || employeeBirhDate< minDate){
        return statusCodes.wrong;
    }

    for (const info in employee){
        if (employee[info] == null){
            console.log(localStorage.getItem(eID))
            console.log(info);
            return statusCodes.messing;
        }
    }

    return statusCodes.valid;
}

function deleteEmployee() {
   const employeeName = `${document.getElementById('first_name').value} ${document.getElementById('last_name').value}`;
   const id = document.getElementById('id').value;

   if (confirm(`Are you sure you want to delete ${employeeName}?`)){
    localStorage.removeItem(id);
   }
   
}

function main() {
    formElement.addEventListener("submit", stopDefaultSubmit);
    submitButton.addEventListener("click", addNewEmployee);
    deleteButton.addEventListener("click", deleteEmployee);
}

main();

function research()
{
    window.location.href = 'search_emp.html';
}