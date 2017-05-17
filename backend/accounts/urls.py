from django.conf.urls import url
from django.contrib.auth.views import LogoutView

from . import views

urlpatterns = [
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^login/$', views.login, name='login'),

    # let's reuse the provided logout view
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]
