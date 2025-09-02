var toastrDemo = function() {
    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-top-center"
    }

    setTimeout(function () {
        toastr.success('Let your ideas fly high!');
    }, 2000);

    setTimeout(function () {
        toastr.info('You have 7 unread message.');
    }, 4000);

    setTimeout(function () {
        toastr.warning('You have an upcomming appointment with Dr. iDea in 1 hour!');
    }, 10000);
}

function notification(code, message) {
    var position = "toast-top-center";
    if (window.location.pathname === "authenticate") {
        position = "toast-top-right";
    }
    var position = "toast-top-center";
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": true,
        "positionClass": position,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    }
    if (code === 200) {
        toastr.success(message);
    } else if (code === 407) {
        toastr.warning(message);
    } else if (code === 500){
        toastr.error(message);
    } else if (code === 201 ){
        toastr.info(message);
    }
}

function notify_info(message) {
    notification(null, message);
}
function notify_success(message) {
    notification(200, message);
}
function notify_warning(message) {
    notification(407, message);
}
function notify_error(message) {
    notification(500, message);
}

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

function editExperience(id){
    ajaxcall('/get-experience/'+id, GET, undefined, true).then(response => {
        if (response) {
            $('#editExperienceModal').modal('show');
            $('#edit-experience-id').val(id);
            // Populate the form fields with the retrieved data
            $('#position-title-edit').val(response.title);
            $('#experience-company-edit').val(response.company);
            $('#experience-description-edit').val(response.description);
            $('#experience-start-edit').val(response.start);
            $('#experience-end-edit').val(response.end);
            $('#points-container-edit').empty();
            response.points.forEach(point => {
                let text = point.point.trim();
                if (text) {
                    let div = document.createElement("div");
                    div.className = "alert alert-secondary d-flex justify-content-between align-items-center py-1 px-2";
                    div.innerHTML = `
                        <span>${text}</span>
                        <input type="hidden" name="experience_points_edit[]" value="${text}">
                        <button type="button" class="btn btn-sm btn-danger remove-point-edit">&times;</button>
                    `;
                    document.getElementById("points-container-edit").appendChild(div);
                    div.querySelector(".remove-point-edit").addEventListener("click", function() {
                        div.remove();
                    });
                }
            });
            $('#selected-skills-edit').empty();
            response.skills.forEach(skill => {
                console.log(skill.id);
                let container = document.getElementById("selected-skills-edit");
                let cb = document.getElementById(`experience_skills_${skill.id}`);

                // Mark checkbox checked if exists
                if (cb) {
                    console.log(cb);
                    cb.checked = true;
                }
                let skillDiv = document.createElement("span");
                skillDiv.className = "badge badge-primary p-2 m-1";
                skillDiv.dataset.skill = skill.id;
                skillDiv.innerHTML = `
                ${skill.name} <button type="button" class="btn btn-sm btn-light ml-1 remove-skill-edit">&times;</button>
                `;
                container.appendChild(skillDiv);
                
                // Remove skill on button click
                skillDiv.querySelector(".remove-skill-edit").addEventListener("click", function() {
                    if (cb) cb.checked = false;
                    skillDiv.remove();
                });
            });
        }
    });
}

function editProject(id){
    $('#editProjectModal').modal('show')
    ajaxcall('/get-project/'+id, GET, undefined, true).then(response => {
        if (response) {
            $('#edit-project-id').val(id)
            $('#editProjectModal').modal('show');
            $('#edit-project-id').val(id);
            $('#edit-project-title').val(response.title);
            $('#edit-project-summary').val(response.summary);
            $('#edit-project-description').val(response.description);
            $('#edit-project-link').val(response.link);
            $("#edit-project-points-container").empty();
            response.points.forEach(point => {
                let div = document.createElement("div");
                div.className = "alert alert-secondary d-flex justify-content-between align-items-center py-1 px-2";
                div.innerHTML = `
                    <span>${point.point}</span>
                    <input type="hidden" name="edit_project_points[]" value="${point.point}">
                    <button type="button" class="btn btn-sm btn-danger edit-remove-project-point">&times;</button>
                `;
                document.getElementById("edit-project-points-container").appendChild(div);
                div.querySelector(".edit-remove-project-point").addEventListener("click", function() {
                    div.remove();
                });
            })
            $("#edit-project-stacks-container").empty();
            response.stacks.forEach(stack => {
                let div = document.createElement("div");
                div.className = "alert alert-secondary d-flex justify-content-between align-items-center py-1 px-2";
                div.innerHTML = `
                    <span>${stack.stack}</span>
                    <input type="hidden" name="edit_project_stacks[]" value="${stack.stack}">
                    <button type="button" class="btn btn-sm btn-danger edit-remove-project-stack">&times;</button>
                `;
                document.getElementById("edit-project-stacks-container").appendChild(div);
                div.querySelector(".edit-remove-project-stack").addEventListener("click", function() {
                    div.remove();
                });
            })
        }
    });
}

$(document).on('hidden.bs.modal', '.modal', function () {
    $(this).find('form').each(function () {
        this.reset();
    });
    $(this).find('.dynamic-content').empty();
});