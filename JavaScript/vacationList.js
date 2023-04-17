function displayVacations(status) {
    let empty = true;

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

    const vacationTable = document.getElementById("Tbody");
    vacationTable.innerHTML = "";
    
    for (let i = 0; i < localStorage.length; i++) {
      const employee = JSON.parse(localStorage.getItem(localStorage.key(i)));
  
      if (employee && employee.vacations) {
        employee.vacations.forEach((vacation) => {
          const vacationObj = JSON.parse(vacation);
  
          if (status === "all" || vacationObj.status.toLowerCase() === status.toLowerCase()) {
            empty = false;
            const row = vacationTable.insertRow();
  
            const idCell = row.insertCell(0);
            idCell.innerHTML = employee.id;
  
            const fromDateCell = row.insertCell(1);
            fromDateCell.innerHTML = vacationObj.fromDate;
  
            const toDateCell = row.insertCell(2);
            toDateCell.innerHTML = vacationObj.toDate;
  
            const reasonCell = row.insertCell(3);
            reasonCell.innerHTML = vacationObj.reason;
  
            const actionCell = row.insertCell(4);
            if (vacationObj.status.toLowerCase() === "submitted") {
              const approveButton = document.createElement("button");
              approveButton.innerText = "Approve";
              approveButton.onclick = () => {
                vacationObj.status = "approved";

                //calculate the number of days
                const fromDate = new Date(vacationObj.fromDate);
                const toDate = new Date(vacationObj.toDate);
                let difference = toDate.getTime() - fromDate.getTime();
                let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                console.log(TotalDays);

                employee.availableVacation = Number(employee.availableVacation) - TotalDays;
                employee.actualVacation = Number(employee.actualVacation) + TotalDays;
                const index = employee.vacations.indexOf(vacation);
                employee.vacations[index] = JSON.stringify(vacationObj);
                localStorage.setItem(employee.id, JSON.stringify(employee));
                displayVacations(status);
              };
              actionCell.appendChild(approveButton);
  
              const rejectButton = document.createElement("button");
              rejectButton.innerText = "Reject";
              rejectButton.onclick = () => {
                vacationObj.status = "rejected";
                const index = employee.vacations.indexOf(vacation);
                employee.vacations[index] = JSON.stringify(vacationObj);
                localStorage.setItem(employee.id, JSON.stringify(employee));
                displayVacations(status);
              };
              actionCell.appendChild(rejectButton);
            } else {
              actionCell.innerHTML = vacationObj.status;
            }
          }
        });
      }
      
    }
    console.log(empty);
    if(empty){
        const vacationTable = document.getElementById("Thead");
        vacationTable.innerHTML = "";
        let table = document.getElementById("vacTable");
        table.innerHTML="<h1>Vacations List</h1> <h3> There are no vacation requests</h3>"
    }
  }