from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('index', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('signout', views.signout, name="signout"),
    path('dashboard', views.dashboard, name="dashboard"),
    
    # Custom pages
    path('', views.home, name="home"),
    path('home', views.home, name="home"),
    
    # Data manage
    path('add-key-value-data', views.add_key_value_data),
    path('get-key-value-data', views.get_key_value_data),
    path('get-key-value-dict', views.get_key_value_dict),

    # template elements
    path('cp_datetime', views.cp_datetime),
    path('cp_bstoggle', views.cp_bstoggle),
    path('ui_typography', views.ui_typography),
    path('ui_colors', views.ui_colors),
    path('ui_fontawesome', views.ui_fontawesome),
    path('ui_themify', views.ui_themify),
    path('ui_buttons', views.ui_buttons),
    path('ui_cards', views.ui_cards),
    path('ui_modals', views.ui_modals),
    path('ui_toastr', views.ui_toastr),
    path('tb_basic', views.tb_basic),
    path('tb_datatables', views.tb_datatables),
    path('fm_control', views.fm_control),
    path('fm_ckeditor_classic', views.fm_ckeditor_classic),
    path('fm_ckeditor_balloon', views.fm_ckeditor_balloon),
    path('fm_ckeditor_block', views.fm_ckeditor_block),
    path('fm_ckeditor_inline', views.fm_ckeditor_inline),
    path('fm_ckeditor_document', views.fm_ckeditor_document),
    path('ch_apexcharts', views.ch_apexcharts),
    path('pg_login', views.pg_login),
    path('documentation', views.documentation),
]