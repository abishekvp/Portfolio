import os
import base64
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
from app import models as md

def get_data(request):
    return_dict = {}
    key_values = md.KeyValue.objects.all()
    for kv in key_values:
        return_dict[kv.key] = kv.value
    return_dict['skills'] = [model_to_dict(skill) for skill in md.Skills.objects.all()]
    return_dict['experience'] = []
    for exp in md.Experience.objects.all():
        exp = model_to_dict(exp)
        exp['skills'] = [skill.skill.name for skill in md.ExperienceSkillsMap.objects.filter(experience=exp['id']).select_related('skill')]
        return_dict['experience'].append(exp)
    return_dict['projects'] = []
    for project in md.Projects.objects.all():
        project = model_to_dict(project)
        project['points'] = [point.point for point in md.ProjectPoint.objects.filter(project=project['id'])]
        project['stacks'] = [stack.stack for stack in md.ProjectStack.objects.filter(project=project['id'])]
        return_dict['projects'].append(project)
    return_dict['testimonials'] = [model_to_dict(testimonial) for testimonial in md.Testimonial.objects.filter(approved=True).order_by('-updated_at')]
    return_dict['status_code'] = 200
    return JsonResponse(return_dict)

def portfolio(request):
    return_dict = {}
    key_values = md.KeyValue.objects.all()
    return_dict['main_image'] = key_values.filter(key='about_main_image').first().image
    return_dict['main_image'] = f"data:image/jpg;base64,{return_dict['main_image']}"
    for kv in key_values:
        return_dict[kv.key] = kv.value
    return_dict['skills'] = [model_to_dict(skill) for skill in md.Skills.objects.all()]
    return_dict['experiences'] = []
    for exp in md.Experience.objects.all():
        exp = model_to_dict(exp)
        exp['skills'] = [skill.skill.name for skill in md.ExperienceSkillsMap.objects.filter(experience=exp['id']).select_related('skill')]
        return_dict['experiences'].append(exp)
    return_dict['projects'] = []
    for project in md.Projects.objects.all():
        project = model_to_dict(project)
        project['points'] = [point.point for point in md.ProjectPoint.objects.filter(project=project['id'])]
        project['stacks'] = [stack.stack for stack in md.ProjectStack.objects.filter(project=project['id'])]
        return_dict['projects'].append(project)
    return_dict['testimonials'] = [model_to_dict(testimonial) for testimonial in md.Testimonial.objects.filter(approved=True).order_by('-updated_at')]
    return_dict['status_code'] = 200
    return render(request, 'portfolio.html', {**return_dict})

def view_testimonials(request):
    return render(request, 'view-testimonials.html', {
        'testimonials': md.Testimonial.objects.filter(approved=True).order_by('-updated_at')
    })

# Custom pages
def home(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            key = request.POST.get('data-key')
            value = request.POST.get('data-value')
            image = request.FILES.get('site-image')
            html = True if request.POST.get('raw-html') else False
            edit_key = request.POST.get('edit-data-key')
            edit_value = request.POST.get('edit-data-value')
            edit_image = request.FILES.get('edit-site-image')
            edit_html = True if request.POST.get('edit-raw-html') else False
            data = {
                'key': key,
                'html': html
            }
            if key and (value or image):
                try:
                    if md.KeyValue.objects.filter(key=key).exists():
                        messages.warning(request, "Key already exists")
                    else:
                        if image:
                            data['image'] = base64.b64encode(image.read()).decode()
                        elif value:
                            data['value'] = value
                        if image or value:
                            md.KeyValue.objects.create(**data)
                            messages.success(request, "Data added successfuly")
                        else:
                            messages.warning(request, "No data detected")
                except Exception as e:
                    messages.error(request, "Unable to add data")
            elif edit_key and (edit_value or edit_image):
                try:
                    if not md.KeyValue.objects.filter(id=request.session['id']).exists():
                        messages.warning(request, "Data does not exist")
                    else:
                        data = {
                            'key': edit_key, 'html': edit_html
                        }
                        if edit_image:
                            data['image'] = base64.b64encode(edit_image.read()).decode()
                        elif edit_value:
                            data['value'] = edit_value
                        if edit_image or edit_value:
                            md.KeyValue.objects.filter(id=request.session['id']).update(**data)
                            messages.success(request, "Data updated successfuly")
                        else:
                            messages.warning(request, "No changes detected")
                except Exception as e:
                    messages.error(request, "Unable to update data")
            else:
                messages.warning(request, "Key and Value are required")
        key_values = md.KeyValue.objects.all()
        return render(request, 'home.html', {'table_data': key_values})
    else:
        return redirect('/signin')

def process_testimonials(queryset):
    processed = []
    for testimonial in queryset:
        photo_data = testimonial['photo']
        photo_ext = testimonial['photo_ext'] or 'jpeg'  # fallback if extension is missing

        if photo_data:
            mime_type = f'image/{photo_ext.lower()}'
            photo_src = f'data:{mime_type};base64,{photo_data}'
        else:
            photo_src = None

        processed.append({
            'id': testimonial['id'],
            'name': testimonial['name'],
            'photo': photo_src
        })

    return processed

def testimonials(request):
    if not request.user.is_authenticated:
        return redirect('signin')

    approved_raw = md.Testimonial.objects.filter(approved=True).values('id', 'name', 'photo', 'photo_ext', 'favourites').order_by('-updated_at')
    non_approved_raw = md.Testimonial.objects.filter(approved=False, disabled=False).values('id', 'name', 'photo', 'photo_ext', 'favourites').order_by('-updated_at')
    disabled_raw = md.Testimonial.objects.filter(disabled=True).values('id', 'name', 'photo', 'photo_ext', 'favourites').order_by('-updated_at')

    approved_testimonials = process_testimonials(approved_raw)
    non_approved_testimonials = process_testimonials(non_approved_raw)
    disabled_testimonials = process_testimonials(disabled_raw)

    return render(request, 'testimonials.html', {
        'approved_testimonials': approved_testimonials,
        'non_approved_testimonials': non_approved_testimonials,
        'disabled_testimonials': disabled_testimonials
    })

def view_testimonial(request):
    if not request.user.is_authenticated:
        return redirect('signin')

    try:
        testimonial = model_to_dict(md.Testimonial.objects.get(id=request.data_dict.get('id')))
        return JsonResponse({'status_code': 200, 'data': testimonial})
    except md.Testimonial.DoesNotExist:
        return JsonResponse({'status_code': 404, 'message': 'Testimonial not found'})

def submit_testimonial(request):
    if request.method == 'POST':
        testimonial = {}
        testimonial['name'] = request.POST.get('name')
        testimonial['company'] = request.POST.get('company')
        testimonial['position'] = request.POST.get('position')
        testimonial['message'] = request.POST.get('message')
        photo = request.FILES.get('photo')
        testimonial['photo'] = base64.b64encode(photo.read()).decode('utf-8') if photo else None
        testimonial['photo_ext'] = photo.name.split('.')[-1] if photo else None
        if testimonial:
            md.Testimonial.objects.create(**testimonial)
            return JsonResponse({'status_code': 200, 'message': 'Testimonial submitted, will be reviewed and live shortly'})
        else:
            return JsonResponse({'status_code': 400, 'message': 'Content is required'})

def approve_testimonial(request, id):
    try:
        testimonial = md.Testimonial.objects.get(id=id)
        testimonial.approved = True
        testimonial.save()
        messages.success(request, 'Testimonial approved successfully')
    except md.Testimonial.DoesNotExist:
        messages.error(request, 'Testimonial not found')
    return redirect('testimonials')

def disapprove_testimonial(request, id):
    try:
        testimonial = md.Testimonial.objects.get(id=id)
        testimonial.approved = False
        testimonial.save()
        messages.success(request, 'Testimonial disapproved successfully')
    except md.Testimonial.DoesNotExist:
        messages.error(request, 'Testimonial not found')
    return redirect('testimonials')

def disable_testimonial(request, id):
    try:
        testimonial = md.Testimonial.objects.get(id=id)
        testimonial.disabled = True
        testimonial.save()
        messages.success(request, 'Testimonial disabled successfully')
    except md.Testimonial.DoesNotExist:
        messages.error(request, 'Testimonial not found')
    return redirect('testimonials')

def enable_testimonial(request, id):
    try:
        testimonial = md.Testimonial.objects.get(id=id)
        testimonial.disabled = False
        testimonial.save()
        messages.success(request, 'Testimonial enabled successfully')
    except md.Testimonial.DoesNotExist:
        messages.error(request, 'Testimonial not found')
    return redirect('testimonials')

def delete_testimonial(request, id):
    try:
        md.Testimonial.objects.get(id=id).delete()
        messages.success(request, 'Testimonial deleted successfully')
    except md.Testimonial.DoesNotExist:
        messages.error(request, 'Testimonial not found')
    return redirect('testimonials')

def skills(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            skill_dict = {}
            skill_dict['id'] = request.POST.get('edit-skill-id')
            if skill_dict['id']:
                try:
                    skill = md.Skills.objects.get(**skill_dict)
                    skill.name = request.POST.get('edit-skill-name')
                    skill.level = request.POST.get('edit-skill-level')
                    skill.save()
                    messages.success(request, 'Skill updated successfully')
                except Exception as e:
                    messages.error(request, 'Error updating skill: ' + str(e))
            else:
                skill_dict['name'] = request.POST.get('skill-name')
                skill_dict['level'] = request.POST.get('skill-level')
                try:
                    md.Skills.objects.create(**skill_dict)
                    messages.success(request, 'Skill added successfully')
                except Exception as e:
                    messages.error(request, 'Error adding skill: ' + str(e))
            skill_dict = {}
        table_data = md.Skills.objects.all()
        return render(request, 'skills.html', {'table_data': table_data})
    else:
        return redirect('signin')

def get_skill(request, id):
    try:
        skill = md.Skills.objects.get(id=id)
        return JsonResponse({'status_code': 200, 'data': model_to_dict(skill)})
    except md.Skills.DoesNotExist:
        return JsonResponse({'status_code': 404, 'message': 'Skill not found'})

def delete_skill(request, id):
    try:
        md.Skills.objects.get(id=id).delete()
        messages.success(request, 'Skill deleted successfully')
    except md.Skills.DoesNotExist:
        messages.error(request, 'Skill not found')
    return redirect('skills')

def projects(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            project = {}
            project['id'] = request.POST.get('edit-project-id')
            if project['id']:
                try:
                    project_instance = md.Projects.objects.get(id=project['id'])
                    project_instance.title = request.POST.get('edit-project-title')
                    image = request.FILES.get('edit-project-image')
                    if image:
                        project_instance.image = base64.b64encode(image.read()).decode('utf-8')
                        project_instance.image_name, project_instance.image_ext = os.path.splitext(image.name)
                    project_instance.link = request.POST.get('edit-project-link')
                    project_instance.summary = request.POST.get('edit-project-summary')
                    project_instance.description = request.POST.get('edit-project-description')
                    project_stacks = request.POST.getlist("edit_project_stacks[]")
                    project_points = request.POST.getlist("edit_project_points[]")
                    md.ProjectStack.objects.filter(project=project_instance).delete()
                    md.ProjectPoint.objects.filter(project=project_instance).delete()
                    for point in project_points:
                        md.ProjectPoint.objects.create(project=project_instance, point=point)
                    for stack in project_stacks:
                        md.ProjectStack.objects.create(project=project_instance, stack=stack)
                    project_instance.save()
                    messages.success(request, 'Project updated successfully')
                except Exception as e:
                    messages.error(request, 'Error updating project: ' + str(e))
            else:
                try:
                    project['title'] = request.POST.get('project-title')
                    project['image'] = request.FILES.get('project-image')
                    if project['image']:
                        project['image'] = base64.b64encode(project['image'].read()).decode('utf-8')
                        project['image_name'], project['image_ext'] = os.path.splitext(request.FILES.get('project-image').name)
                    project['description'] = request.POST.get('project-description')
                    project['link'] = request.POST.get('project-link')
                    project['summary'] = request.POST.get('project-summary')
                    stacks = request.POST.getlist("project_stacks[]")
                    points = request.POST.getlist("project_points[]")
                    project = md.Projects.objects.create(**project)
                    messages.success(request, 'Project added successfully')
                    for stack in stacks:
                        md.ProjectStack.objects.create(project=project, stack=stack)
                    for point in points:
                        md.ProjectPoint.objects.create(project=project, point=point)
                except Exception as e:
                    messages.error(request, 'Error adding project: ' + str(e))
        projects = md.Projects.objects.all()
        projects_data = []
        for project in projects:
            image = project.image
            project = model_to_dict(project)
            project['stacks'] = [stack.stack for stack in md.ProjectStack.objects.filter(project=project['id'])]
            project['points'] = [point.point for point in md.ProjectPoint.objects.filter(project=project['id'])]
            projects_data.append(project)
            if image:
                project['image'] = image
        return render(request, 'projects.html', {'projects': projects_data})
    else:
        return redirect('signin')

def get_project(request, id):
    if request.user.is_authenticated:
        try:
            project = md.Projects.objects.get(id=id)
            project_data = model_to_dict(project)
            project_data['stacks'] = [model_to_dict(stack) for stack in md.ProjectStack.objects.filter(project=id)]
            project_data['points'] = [model_to_dict(point) for point in md.ProjectPoint.objects.filter(project=id)]
            return JsonResponse({'status': 200, 'data': project_data})
        except md.Projects.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=404)
    return JsonResponse({'error': 'Unauthorized'}, status=401)

def delete_project(request, id):
    if request.user.is_authenticated:
        if not id:
            messages.error(request, "Failed to delete project")
            pass
        else:
            md.ProjectPoint.objects.filter(project_id=id).delete()
            md.ProjectStack.objects.filter(project_id=id).delete()
            md.Projects.objects.filter(id=id).delete()
            messages.success(request, "Project deleted successfully")
        return redirect('projects')
    return redirect('signin')

def experience(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            experience_dict = {}
            experience_dict['title'] = request.POST.get('position-title')
            experience_dict['company'] = request.POST.get('experience-company')
            experience_dict['start'] = request.POST.get('experience-start')
            experience_dict['end'] = request.POST.get('experience-end', 'PRESENT')
            experience_dict['description'] = request.POST.get('experience-description')
            experience_dict['skills'] = request.POST.getlist("experience_skills[]")
            experience_dict['points'] = request.POST.getlist("experience_points[]")

            experience_dict['title'] = request.POST.get('position-title-edit')
            experience_dict['company'] = request.POST.get('experience-company-edit')
            experience_dict['start'] = request.POST.get('experience-start-edit')
            experience_dict['end'] = request.POST.get('experience-end-edit')
            experience_dict['description'] = request.POST.get('experience-description-edit')
            experience_dict['skills'] = request.POST.getlist("experience_skills_edit[]")
            experience_dict['points'] = request.POST.getlist("experience_points_edit[]")
            try:
                if request.POST.get('position-title'):
                    experience = md.Experience.objects.create(
                        company=experience_dict['company'],
                        title=experience_dict['title'],
                        start=experience_dict['start'],
                        end=experience_dict['end'],
                        description=experience_dict['description']
                    )
                    for skill in experience_dict['skills']:
                        skill = md.Skills.objects.get(id=skill)
                        md.ExperienceSkillsMap.objects.create(
                            experience=experience,
                            skill=skill
                        )
                    for point in experience_dict.get('points', []):
                        md.ExperiencePoint.objects.create(
                            experience=experience,
                            point=point
                        )
                    messages.success(request, 'Experience created successfully')
                elif request.POST.get('position-title-edit'):
                    id = request.POST.get('edit-experience-id')
                    if not id:
                        messages.error(request, 'Edit experience ID not found')
                        return redirect('experience')
                    experience = md.Experience.objects.filter(id=id).first()
                    experience.company = experience_dict['company']
                    experience.title = experience_dict['title']
                    experience.start = experience_dict['start']
                    if experience_dict['end']:
                        experience.end = experience_dict['end']
                    else:
                        experience.end = 'PRESENT'
                    experience.description = experience_dict['description']
                    experience.save()
                    md.ExperienceSkillsMap.objects.filter(experience=experience).delete()
                    md.ExperiencePoint.objects.filter(experience=experience).delete()
                    for skill in experience_dict['skills']:
                        skill = md.Skills.objects.get(id=skill)
                        md.ExperienceSkillsMap.objects.create(
                            experience=experience,
                            skill=skill
                        )
                    for point in experience_dict.get('points', []):
                        md.ExperiencePoint.objects.create(
                            experience=experience,
                            point=point
                        )
                    messages.success(request, 'Experience update successfully')
                    pass
            except Exception as e:
                messages.error(request, 'Error creating experience: ' + str(e))
        experiences_data = []
        experiences = md.Experience.objects.all()
        for experience in experiences:
            skills = md.ExperienceSkillsMap.objects.filter(experience=experience)
            points = md.ExperiencePoint.objects.filter(experience=experience)
            experience = model_to_dict(experience)
            experience['skills'] = []
            experience['points'] = []
            for skill in skills:
                experience['skills'].append(skill.skill.name)
            for point in points:
                experience['points'].append(point.point)
            experiences_data.append(experience)
        skills = md.Skills.objects.all()
        return render(request, 'experience.html', {'experiences': experiences_data, 'skills': skills})
    else:
        return redirect('signin')

def get_experience(request, id):
    if request.user.is_authenticated:
        experience = md.Experience.objects.filter(id=id).first()
        if experience:
            experience_dict = model_to_dict(experience)
            experience_dict['id'] = id
            experience_dict['skills'] = []
            experience_dict['points'] = []
            skills = md.ExperienceSkillsMap.objects.filter(experience=experience)
            points = md.ExperiencePoint.objects.filter(experience=experience)
            for skill in skills:
                experience_dict['skills'].append({'id': skill.skill.id, 'name': skill.skill.name})
            for point in points:
                experience_dict['points'].append({'id': point.id, 'point': point.point})
            return JsonResponse({'status_code': 200, 'data': experience_dict})
    return JsonResponse({'status_code': 403, 'message': 'Unauthorized'})

def delete_experience(request, id):
    if request.user.is_authenticated:
        if not id:
            messages.error(request, "Failed to delete experience")
            pass
        else:
            md.ExperiencePoint.objects.filter(id=id).delete()
            md.ExperienceSkillsMap.objects.filter(id=id).delete()
            md.Experience.objects.filter(id=id).delete()
            messages.success(request, "Experience deleted successfully")
        return redirect('experience')
    else:
        return redirect('signin')

def settings(request):
    if request.user.is_authenticated:
        return render(request, 'settings.html')
    else:
        return redirect('signin')

# Data manage

def add_key_value_data(request):
    return_dict = {}
    key = request.data_dict.get('key')
    value = request.data_dict.get('value')
    raw_html = request.data_dict.get('raw-html', False)
    if not key or not value:
        return_dict['status_code'] = 403
        return_dict['message'] = 'Required Key and Value'
        return JsonResponse(return_dict)
    if raw_html:
        raw_html = True
    md.KeyValue.objects.create(key=key, value=value, html=raw_html)
    return_dict['status_code'] = 200
    return_dict['message'] = 'Key and Value successfully added'
    return JsonResponse(return_dict)

def get_key_value(request):
    id = request.data_dict.get('id')
    request.session['id'] = id
    data = md.KeyValue.objects.filter(id=id).first()
    if data:
        return JsonResponse({'status_code': 200, 'data': model_to_dict(data)})
    return JsonResponse({'status_code': 404, 'message': 'Data not found'})

def delete_key_value(request, id):
    try:
        md.KeyValue.objects.filter(id=id).delete()
        messages.success(request, 'Data deleted successfully')
    except Exception as e:
        messages.error(request, 'Error deleting data: ' + str(e))
    return redirect('dashboard')

def get_key_value_data(request):
    return_dict = {}
    return_dict['status_code'] = 200
    key_values = md.KeyValue.objects.all()
    return_dict['data'] = [model_to_dict(obj) for obj in key_values]
    return JsonResponse(return_dict)


def get_key_value_dict(request):
    return_dict = {}
    return_dict['status_code'] = 200
    key_values = md.KeyValue.objects.all()
    return_dict['data'] = [model_to_dict(obj) for obj in key_values]
    return JsonResponse(return_dict)

def get_ids(request):
    return_dict = {}
    return_dict['status_code'] = 200
    key_values = md.KeyValue.objects.all()
    return_dict['data'] = [obj.key for obj in key_values]
    return_dict['testimonials'] = []
    for testimonial in md.Testimonial.objects.filter(approved=True).order_by('-updated_at'):
        test = testimonial.__dict__
        test.pop('_state', None)  # Remove the _state attribute
        if testimonial.photo:
            test['photo'] = testimonial.photo
        else:
            test['photo'] = None
        return_dict['testimonials'].append(test)
    return JsonResponse(return_dict)

def index(request):
    if request.user.is_authenticated:return redirect("dashboard")
    else:return redirect('signin')

def dashboard(request):
    if request.user.is_authenticated:
        return render(request,'dashboard.html')
    else:
        return redirect('signin')

def signup(request):
    if request.method == 'POST':
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        if username and email and password:
            if not User.objects.filter(username=username).exists() and not User.objects.filter(email=email).exists():
                user = User.objects.create_user(username, email, password)
                user.save()
                messages.success(request, 'Account created successfully')
                return redirect('signin')
            else:
                messages.error(request, 'Username or Email already exists')
                return redirect('signin')
        else:
            messages.error(request, 'Please fill all the fields to create an account')
    return render(request,'signup.html')

def signin(request):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentials Please try again')
    return render(request,'signin.html')

def signout(request):
    if request.user.is_authenticated: logout(request)
    return redirect('signin')

# template elemenents

def cp_datetime(request):
    return render(request, 'cp_datetime.html')

def cp_bstoggle(request):
    return render(request, 'cp_bstoggle.html')

def ui_typography(request):
    return render(request, 'ui_typography.html')

def ui_colors(request):
    return render(request, 'ui_colors.html')

def ui_fontawesome(request):
    return render(request, 'ui_fontawesome.html')

def ui_themify(request):
    return render(request, 'ui_themify.html')

def ui_buttons(request):
    return render(request, 'ui_buttons.html')

def ui_cards(request):
    return render(request, 'ui_cards.html')

def ui_modals(request):
    return render(request, 'ui_modals.html')

def ui_toastr(request):
    return render(request, 'ui_toastr.html')

def tb_basic(request):
    return render(request, 'tb_basic.html')

def tb_datatables(request):
    return render(request, 'tb_datatables.html')

def fm_control(request):
    return render(request, 'fm_control.html')

def fm_ckeditor_classic(request):
    return render(request, 'fm_ckeditor_classic.html')

def fm_ckeditor_balloon(request):
    return render(request, 'fm_ckeditor_balloon.html')

def fm_ckeditor_block(request):
    return render(request, 'fm_ckeditor_block.html')

def fm_ckeditor_inline(request):
    return render(request, 'fm_ckeditor_inline.html')

def fm_ckeditor_document(request):
    return render(request, 'fm_ckeditor_document.html')

def ch_apexcharts(request):
    return render(request, 'ch_apexcharts.html')

def pg_login(request):
    return render(request, 'pg_login.html')

def documentation(request):
    return render(request, 'documentation.html')