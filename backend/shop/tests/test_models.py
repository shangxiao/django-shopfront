from django.test import TestCase

from shop.models import Product


class ProductTestCase(TestCase):
    def test_str(self):
        a_product = Product(name='Stül')

        self.assertEqual(str(a_product), 'Stül')
