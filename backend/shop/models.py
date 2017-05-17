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
    def __init__(self, products=None):
        self.products = products or []

    def add_item(self, product_id):
        # we could validate the product id here
        try:
            product = next(p for p in self.products if p.product_id == product_id)
            product.quantity += 1
        except StopIteration:
            self.products.append(CartProduct(product_id=product_id))

    def subtract_item(self, product_id):
        try:
            product = next(p for p in self.products if p.product_id == product_id)
            product.quantity -= 1
            if product.quantity <= 0:
                self.products.remove(product)
        except StopIteration:
            pass


class CartSchema(Schema):
    products = fields.Nested('CartProductSchema', many=True)

    @post_load
    def make_object(self, data):
        return Cart(**data)


class CartProduct:
    def __init__(self, product_id, quantity=1):
        self.product_id = product_id
        self.quantity = quantity


class CartProductSchema(Schema):
    product_id = fields.Integer()
    quantity = fields.Integer()

    @post_load
    def make_object(self, data):
        return CartProduct(**data)
