function notify(message, mode){
    if (!message || !mode){
        return
    }
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
    var mode;
    if (status == 200){
        mode = SUCCESS;
    } else if (status == 403){
        mode = WARNING;
    } else if (status == 202) {
        mode = INFO;
    } else {
        mode = ERROR;
    }    
    if (message && mode){
        notify(message, mode);
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
                if (error.status && error.statusText){
                    notify(error.status + ': ' + error.statusText, ERROR);
                }
                reject(error);
            }
        });
    });
}

function editData(id){
    var data = {
        'id': id,
    }
    ajaxcall('/get-key-value', POST, data, true).then(response => {
        $('#editKeyValue').modal('show');
        $('#edit-data-key').val(response.key);
        $('#edit-data-value').val(response.value);
        if (response.html){
            $('#edit-raw-html').prop('checked', true)
        }
    })
}

function approveTestimonial(id){
    var data = {
        'id': id,
    }
    ajaxcall('/approve-testimonial', POST, data, true)
}

function viewTestimonial(id){
    var data = {
        'id': id,
    }
    ajaxcall('/view-testimonial', POST, data, true).then(response => {
        // Handle the response here
        if (response) {
            $('#testimonial-name').text(response.name);
            $('#testimonial-position').text(response.position);
            $('#testimonial-company').text(response.company);
            $('#testimonial-message').text(response.message);
            $('#testimonialModal').modal('show');
        }
    })
}

function disapproveTestimonial(id){
    var data = {
        'id': id,
    }
    ajaxcall('/disapprove-testimonial', POST, data, true)
}

function editSkill(id){
    ajaxcall('/get-skill/'+id, GET, undefined, true).then(response => {
        $('#editSkill').modal('show');
        $('#edit-skill-id').val(response.id);
        $('#edit-skill-name').val(response.name);
        $('#edit-skill-level').val(response.level);
    })
}

function confirmModal(message) {
    return new Promise((resolve) => {
        $('#modal-confirmation-message').text(message);
        $('#confirmModal').modal('show');

        $('#confirmButton').off('click').on('click', function() {
            $('#confirmModal').modal('hide');
            resolve(true);
        });

        $('#cancelButton').off('click').on('click', function() {
            $('#confirmModal').modal('hide');
            resolve(false);
        });
    });
}

async function deleteSkill(id) {
    let confirmed = await confirmModal("Are you sure you want to delete this skill?");
    if (confirmed) {
        window.location.href = '/delete-skill/' + id;
    }
}
