from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import viewsets

from .models import Cart, CartSchema, Order, Product
from .serializers import OrderSerializer, ProductSerializer

DEFAULT_CART = CartSchema().dump(Cart()).data


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


def cart(request):
    return JsonResponse(data=request.session.get('cart', DEFAULT_CART))


@require_POST
def add_item_to_cart(request, product_id):
    cart_schema = CartSchema()
    cart = cart_schema.load(request.session.get('cart', DEFAULT_CART)).data
    cart.add_item(int(product_id))
    json_cart = cart_schema.dump(cart).data
    request.session['cart'] = json_cart
    return JsonResponse(data=json_cart)


@require_POST
def subtract_item_from_cart(request, product_id):
    cart_schema = CartSchema()
    cart = cart_schema.load(request.session.get('cart', DEFAULT_CART)).data
    cart.subtract_item(int(product_id))
    json_cart = cart_schema.dump(cart).data
    request.session['cart'] = json_cart
    return JsonResponse(data=json_cart)
