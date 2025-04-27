function notify(message, mode){
    switch (mode) {
        case INFO:
            toastr.info(message);
            break;
        case SUCCESS:
            toastr.success(message);
            break;
        case WARNING:
            toastr.warning(message);
            break;
        case ERROR:
            toastr.error(message);
            break;
        default:
            toastr.error(message);
            break;
    }
}

function handleResponse(response, noti){
    var status = response.status_code;
    var message = response.message;
    if (status == undefined || message == undefined){
        notify('Something went wrong!', ERROR);
        return
    }
    var return_message = '';
    var mode;
    if (status){
        return_message = return_message + status;
        return_message = return_message + ' ';
    }
    if (message){
        return_message = return_message + message;
    }
    if (status == 200){
        mode = SUCCESS;
    } else if (status == 403){
        mode = WARNING;
    } else if (status == 202) {
        mode = INFO;
    } else {
        mode = ERROR;
    }    
    if (noti){
        notify(return_message, mode);
    }
    if (response.data) {
        return response.data;
    }
    return null;
}

function ajaxcall(url, method, data, noti){
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            beforeSend: function (xhr) {
                var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
                if (csrfToken) {
                    xhr.setRequestHeader('X-CSRFToken', csrfToken);
                } else {
                    notify('CSRF token not found.', ERROR);
                }
            },
            success: function (response) {
                if (response){
                    let data = handleResponse(response, noti);
                    resolve(data);
                } else {
                    notify('No response found', ERROR);
                    reject('No response');
                }
            },
            error: function (error) {
                notify(error.status + ': ' + error.statusText, ERROR);
                reject(error);
            }
        });
    });
}


function loadTableWithHeaders(tableHead, tableBody, dataList) {
    tableHead = document.getElementById(tableHead);
    tableBody = document.getElementById(tableBody);
    
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (!dataList.length) {
        tableBody.innerHTML = '<tr><td colspan="100%">No data found</td></tr>';
        return;
    }

    let firstRow = dataList[0];
    for (let key in firstRow) {
        if (firstRow.hasOwnProperty(key)) {
            let th = document.createElement('th');
            th.innerText = key.toUpperCase();
            tableHead.appendChild(th);
        }
    }

    dataList.forEach(data => {
        let row = document.createElement('tr');
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let cell = document.createElement('td');
                cell.innerText = data[key];
                row.appendChild(cell);
            }
        }
        tableBody.appendChild(row);
    });
}


function loadData(tableId, dataList) {
    let tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';

    if (!dataList.length) {
        tableBody.innerHTML = '<tr><td colspan="100%">No data found</td></tr>';
        return;
    }

    dataList.forEach(data => {
        let row = document.createElement('tr');

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let cell = document.createElement('td');
                cell.innerText = data[key];
                row.appendChild(cell);
            }
        }

        tableBody.appendChild(row);
    });
}

function getKeyValueData(){
    ajaxcall('/get-key-value-data', 'GET', null, true).then(response => {
        loadTableWithHeaders('key-value-data-head', 'key-value-data-body', response);
    }).catch(error => {
        notify('Error fetching key-value data: ' + error, ERROR);
    });
}

function addKeyValueData(){
    var data = {
        'key': $('#data-key').val(),
        'value': $('#data-value').val(),
        'raw-html': $('#raw-html').val()
    }
    ajaxcall('/add-key-value-data', POST, data, true);
    getKeyValueData();
}