from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^cart/$', views.cart, name='cart'),
    url(r'^cart/add-item/(?P<product_id>\d+)/$', views.add_item_to_cart, name='add-item-to-cart'),
    url(r'^cart/subtract-item/(?P<product_id>\d+)/$', views.subtract_item_from_cart, name='subtract-item-from-cart'),
]
