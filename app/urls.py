from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('index', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('signout', views.signout, name="signout"),

    path('get-data', csrf_exempt(views.get_data)),
    path('portfolio', csrf_exempt(views.portfolio)),
    path('view-testimonials', views.view_testimonials, name='view-testimonials'),

    # Custom pages
    path('', views.home, name="home"),
    path('dashboard', views.home, name="dashboard"),
    path('home', views.home, name="home"),
    
    path('testimonials', views.testimonials, name="testimonials"),
    path('submit-testimonial', csrf_exempt(views.submit_testimonial)),
    path('approve-testimonial/<int:id>', views.approve_testimonial),
    path('disapprove-testimonial/<int:id>', views.disapprove_testimonial),
    path('disable-testimonial/<int:id>', views.disable_testimonial),
    path('enable-testimonial/<int:id>', views.enable_testimonial),
    path('delete-testimonial/<int:id>', views.delete_testimonial),
    path('view-testimonial', views.view_testimonial),

    path('experience', views.experience, name="experience"),
    path('projects', views.projects, name="projects"),
    path('get-project/<int:id>', views.get_project),
    path('delete-project/<int:id>', views.delete_project),

    path('settings', views.settings, name="settings"),
    path('skills', views.skills, name="skills"),
    path('get-skill/<int:id>', views.get_skill, name="get_skill"),
    path('delete-skill/<int:id>', views.delete_skill, name="delete_skill"),
    path('delete-experience/<int:id>', views.delete_experience, name='delete-experience'),
    path('get-experience/<int:id>', views.get_experience),

    # Data manage
    path('add-key-value-data', views.add_key_value_data),
    path('get-key-value-data', views.get_key_value_data),
    path('get-key-value', views.get_key_value),
    path('delete-key-value/<int:id>', views.delete_key_value),
    path('get-key-value-dict', views.get_key_value_dict),
    path('get-ids', views.get_ids),

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