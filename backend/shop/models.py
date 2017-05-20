from django.conf import settings
from django.db import models
from marshmallow import Schema, fields, post_load


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image_url = models.URLField()
    is_swivel = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='orders')
    products = models.ManyToManyField('Product')


class Cart:
    def __init__(self, items=None):
        self.items = items or []

    def add_item(self, product_id):
        # we could validate the product id here
        try:
            item = next(i for i in self.items if i.product_id == product_id)
            item.quantity += 1
        except StopIteration:
            self.items.append(CartItem(product_id=product_id))

    def subtract_item(self, product_id):
        try:
            item = next(i for i in self.items if i.product_id == product_id)
            item.quantity -= 1
            if item.quantity <= 0:
                self.items.remove(item)
        except StopIteration:
            pass


class CartSchema(Schema):
    items = fields.Nested('CartItemSchema', many=True)

    @post_load
    def make_object(self, data):
        return Cart(**data)


class CartItem:
    def __init__(self, product_id, quantity=1):
        self.product_id = product_id
        self.quantity = quantity


class CartItemSchema(Schema):
    product_id = fields.Integer()
    quantity = fields.Integer()

    @post_load
    def make_object(self, data):
        return CartItem(**data)
