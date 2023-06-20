async function search()
{
    let emptyTableData = 
    `<table class="searchTable" id="searchTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>phone</th>
                <th>id</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="Tbody">
            `;

    // hide the search text bar to avoid multiple searches
    document.getElementById("searchSection").style.display = 'none';
    
    // get the value of the name to search by
    let requiredName = document.getElementById("searchName").value;
    
    // retrieve all data in the localstrorage in this array
    const valuesArray = await ajaxSearchByName(requiredName);

    // to store the value of each row in the output table
    let eTableData = ``;

    //flag if nothing is found
    let flag = true;

    for (let i in valuesArray) {
        flag = false;
        eTableData += 
        `<tr>
            <td>${valuesArray[i].firstName}</td>
            <td>${valuesArray[i].phone}</td>
            <td>${valuesArray[i].id}</td>
            <td>
                <!-- <button>Approve</button>
                <button onclick="reject(${valuesArray[i].id}, this)" id"reject">Reject</button> -->
                <button onclick="edit(${valuesArray[i].id})" id="edit">Info</button>
            </td>
        </tr>`;
    }

    let out = document.getElementById("tableDiv");
    
    if (flag) 
    {
        // show message that there is nothing found
        out.innerHTML = "<h3>There is no employee by this name in Our Data :(</h3><br>";

    }
    else
    {
        out.innerHTML = emptyTableData + eTableData + `</tbody></table>`;
    }

    out.innerHTML += "<button onclick=\"research()\" value=\"reSearch\" name=\"research\">Research</button>";
    out.style.display = 'flex';
}

async function  ajaxSearchByName(name) {
    let result = []
    await $.ajax({
        url: '/ajax/searchEmployee',
        type: 'GET',
        data: {"name": name},
        success: function (resposnse) {result=resposnse},
        error: function (error) {console.log(error)},
    })

    return result;
}

function research()
{
    document.getElementById("searchName").value = '';
    document.getElementById("tableDiv").style.display = 'none';
    document.getElementById("searchSection").style.display = 'flex';

}

function reject (id, button)
{
    deleteRow(button);
    localStorage.removeItem(id);
}

function deleteRow(button) {
    // Get the row that contains the clicked button
    const row = button.parentNode.parentNode;

    // Get the table that contains the row
    const table = row.parentNode.parentNode;

    // Delete the row from the table
    table.deleteRow(row.rowIndex);
}

function edit (id)
{
    // use the localStorage to store the sent id in order to easy access the required employee for edit
    link = document.getElementById("employee_info_url").getAttribute("data-url") + "?id=" + id;
    window.location.href = link;
}