async function displayVacations(status) {
  let vacations = await ajaxGetVacationsByStatus(status)
    let empty = vacations.length === 0;

    displayTableHeaders();

    const vacationTable = document.getElementById("Tbody");
    vacationTable.innerHTML = "";
    
    for (let i = 0; i < vacations.length; i++) {
  
        const vacationObj = vacations[i];
  
        const row = vacationTable.insertRow();

        const idCell = row.insertCell(0);
        idCell.innerHTML = vacationObj.employeeID;

        const fromDateCell = row.insertCell(1);
        fromDateCell.innerHTML = vacationObj.fromDate;

        const toDateCell = row.insertCell(2);
        toDateCell.innerHTML = vacationObj.toDate;

        const reasonCell = row.insertCell(3);
        reasonCell.innerHTML = vacationObj.reason;

        const actionCell = row.insertCell(4);
        if (vacationObj.status.toLowerCase() === "pending") {
            displayApproveRefectButtons(vacationObj, actionCell, status);
        } else {
            actionCell.innerHTML = vacationObj.status;
        }
    }
    
    if(empty){
        const vacationTable = document.getElementById("Thead");
        vacationTable.innerHTML = "";
        let table = document.getElementById("vacTable");
        table.innerHTML="<h1>Vacations List</h1> <h3> There are no vacation requests</h3>"
    }
  }

async function displayApproveRefectButtons(vacationObj, actionCell, status) {
    const approveButton = document.createElement("button");
    approveButton.innerText = "Approve";
    approveButton.onclick = async () => {
        await ajaxApproveVacation(vacationObj.id);
        displayVacations(status);
    };
    
    actionCell.appendChild(approveButton);
    
    const rejectButton = document.createElement("button");
    rejectButton.innerText = "Reject";
    rejectButton.onclick = async () => {
        await ajaxRejectVacation(vacationObj.id);
        displayVacations(status);
    };
actionCell.appendChild(rejectButton);

}

function displayTableHeaders(){
    let table = document.getElementById("vacTable");
    table.innerHTML = `
    <table class="searchTable" id="searchTable">
    <thead id="Thead">
            <tr>
                <th>id</th>
                <th>From</th>
                <th>To</th>
                <th class="reason">Reason</th>
                <th class="action">Action</th>
            </tr>
        </thead>
        <tbody id="Tbody">

        </tbody>
    </table>
    `
}

async function ajaxApproveVacation(id) {
    await $.ajax({
        url: "/ajax/approveVacation",
        type: "POST",
        data: {"id": id},
        success: function (data) {},
        error:  function (error) {alert(error)}
    })
}

async function ajaxRejectVacation(id) {
    await $.ajax({
        url: "/ajax/rejectVacation",
        type: "POST",
        data: {"id": id},
        success: function (data) {},
        error:  function (error) {alert(error)}
    })

}

async function ajaxGetVacationsByStatus(status) {
    let vacations = []
    await $.ajax({
        url: "/ajax/getVacationsByStatus",
        type: "GET",
        data: {"status": status},
        success: function (data) {vacations = data;},
        error:  function (error) {alert(error)}
    })
    return vacations
}

