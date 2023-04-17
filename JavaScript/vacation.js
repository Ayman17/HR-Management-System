const submitButton = document.getElementById('submit');
const formElement = document.getElementById('form');

const errorMessages = {
    2: "Not vaild vacation information",
    3: "Some input fields are messing",
}

const statusCodes = {
    valid: 1,
    wrong: 2,
    messing: 3,
};


function addNewVacation() {    
    let empID = document.getElementById("id").value;
    const vacation = {
        fromDate: document.getElementById("from_date").value,
        toDate: document.getElementById("to_date").value,
        reason: document.getElementById("reason").value,
        status: "submitted",
    };
    const infoValidation = isValidVacation(vacation)
    if (infoValidation == statusCodes.valid){
        let empData = getEmployeeInfo(empID);
        console.log(empData.vacations);
        //empData.vacations.push(JSON.stringify(vacation));
        //localStorage.setItem(empID, empData);
    }else {
        alert(errorMessages[infoValidation]);
    }
}

function stopDefaultSubmit(e) {
    e.preventDefault();
}

function getEmployeeInfo(id) {
    const employee = localStorage.getItem(id);
    return employee;
}

function isValidVacation(vacation){
    let empID = document.getElementById("id").value;
    if (localStorage.getItem(empID) == null){
        return statusCodes.wrong;
    }

    const fromDate = new Date(vacation.fromDate);
    const toDate = new Date(vacation.toDate);

    if (fromDate <= new Date() || toDate <= new Date()){
        console.log("test2");
        return statusCodes.wrong;
    }

    if (fromDate >= toDate){
        console.log("test3");
        return statusCodes.wrong;
    }

    let difference = toDate.getTime() - fromDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (TotalDays > getEmployeeInfo(empID).availableVacation){
        console.log("test4");
        return statusCodes.wrong;
    }

    return statusCodes.valid;
}

function main() {
    formElement.addEventListener("submit", stopDefaultSubmit);
    submitButton.addEventListener("click", addNewVacation);
}

main();