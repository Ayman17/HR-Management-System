const submitButton = document.getElementById('submit');
const formElement = document.getElementById('form');

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

async function addNewEmployee() {
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
        vacations: [],
    };
    const infoValidation = isValidEmployee(employee)
    if (infoValidation == statusCodes.valid){
        // localStorage.setItem(employee.id, JSON.stringify(employee));
        const responseStatus = await ajaxSaveEmployee(employee);
        if (responseStatus){
            displayAddedEmployee();
    }

    }else {
        alert(errorMessages[infoValidation]);
    }
}

function displayAddedEmployee() {
    const contentDiv = document.getElementById("content_div");
    const myH3 = document.createElement('h3');
    myH3.textContent = 'Employee added successfully :)';
    contentDiv.append(myH3);
    contentDiv.append(document.createElement('br'));

    const myButton = document.createElement('button');
    myButton.textContent = 'Add another employee';
    myButton.setAttribute("onclick", "addNew()");
    contentDiv.append(myButton);

    contentDiv.classList.add('centered_data')
    document.getElementById("formDiv").style.display = 'none';
}

// function getEmployeeInfo(id) {
//     const employee = localStorage.getItem(id);
//     return employee;
// }

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
            return statusCodes.messing;
        }
    }

    return statusCodes.valid;
}

async function ajaxSaveEmployee(employee) {
    const data = {"employee": JSON.stringify(employee)}
    let responseStatus = true;
    await $.ajax({
        url: '/ajax/addNewEmployee',
        type: 'POST',
        data: data,
        success: function (resposnse) {
            if (resposnse.error != null) {
                responseStatus = false;
                alert(resposnse.error);
            }
        },
        error: function (error) {console.log(error);},
    })
    return responseStatus;
}

function main() {
    formElement.addEventListener("submit", stopDefaultSubmit);
    submitButton.addEventListener("click", addNewEmployee);
}

function addNew(){
    const link = document.getElementById("current_url").getAttribute("data-url");
    window.location.href = link;
}
main();