function search()
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
            <tr>
                <td>Ahmed</td>
                <td>01050505050</td>
                <td>20</td>
                <td>
                    <button>Approve</button>
                    <button>Reject</button>
                    <button>Edit</button>
                </td>
            </tr>`;

    // hide the search text bar to avoid multiple searches
    document.getElementById("searchSection").style.display = 'none';
    
    // get the value of the name to search by
    let requiredName = document.getElementById("searchName").value;
    
    // retrieve all data in the localstrorage in this array
    const valuesArray = Object.values(localStorage);

    // to store the value of each row in the output table
    let eTableData = ``;

    //flag if nothing is found
    let flag = true;

    // searching in the data
    for (let i = 0; i < valuesArray.length; ++i)
    {
        let e = JSON.parse(valuesArray[i]);
        if (requiredName == e.firstName)
        {
            flag = false;
            eTableData += 
            `<tr>
                <td>${e.firstName}</td>
                <td>${e.phone}</td>
                <td>${e.id}</td>
                <td>
                    <button>Approve</button>
                    <button>Reject</button>
                    <button>Edit</button>
                </td>
            </tr>`;
        }
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

function research()
{
    document.getElementById("searchName").value = '';
    document.getElementById("tableDiv").style.display = 'none';
    document.getElementById("searchSection").style.display = 'flex';

}