
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
from app import models as md

# Custom pages
def home(request):
    key_values = md.KeyValue.objects.all()
    return render(request, 'home.html', {'key_values': key_values})


# Data manage

def add_key_value_data(request):
    return_dict = dict()
    key = request.data_dict.get('key')
    value = request.data_dict.get('value')
    raw_html = request.data_dict.get('raw-html', False)
    if not key or not value:
        return_dict['status_code'] = 403
        return_dict['message'] = 'Required Key and Value'
        return JsonResponse(return_dict)
    if raw_html:
        raw_html = True
    md.KeyValue.objects.create(key=key, value=value, raw_html=raw_html)
    return_dict['status_code'] = 200
    return_dict['message'] = 'Key and Value successfully added'
    return JsonResponse(return_dict)

def get_key_value_data(request):
    return_dict = dict()
    return_dict['status_code'] = 200
    return_dict['message'] = 'Successfully Key Value data fetched'
    key_values = md.KeyValue.objects.all()
    return_dict['data'] = [model_to_dict(obj) for obj in key_values]
    return JsonResponse(return_dict)

def get_key_value_dict(request):
    return_dict = dict()
    return_dict['status_code'] = 200
    key_values = md.KeyValue.objects.all()
    return_dict['data'] = [model_to_dict(obj) for obj in key_values]
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