from django.test import TestCase

from shop.models import Product


class ProductTestCase(TestCase):
    def setUp(self):
        self.black_desk_chair = Product.objects.create(
            name='Svën',
            description='black desk chair',
            price='3.00',
            is_swivel=True,
        )

    def test_any_user_can_list(self):
        response = self.client.get('/api/products/')

        self.assertEqual(response.status_code, 200)
        products = response.json()
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0]['name'], 'Svën')
        self.assertEqual(products[0]['description'], 'black desk chair')
        self.assertEqual(products[0]['price'], '3.00')
        self.assertEqual(products[0]['is_swivel'], True)

    def test_any_user_can_retrieve(self):
        response = self.client.get('/api/products/{}/'.format(self.black_desk_chair.id))

        self.assertEqual(response.status_code, 200)
        product = response.json()
        self.assertEqual(product['name'], 'Svën')
        self.assertEqual(product['description'], 'black desk chair')
        self.assertEqual(product['price'], '3.00')
        self.assertEqual(product['is_swivel'], True)

    def test_update_not_implemented(self):
        """
        Admins will be updating through the admin interface, so leave out of REST API
        """
        response = self.client.put('/api/products/{}/'.format(self.black_desk_chair.id), data={
            'name': 'Stül',
        }, format='json')

        self.assertEqual(response.status_code, 405)

    def test_delete_not_implemented(self):
        """
        Admins will be deleting through the admin interface, so leave out of REST API
        """
        response = self.client.delete('/api/products/{}/'.format(self.black_desk_chair.id))

        self.assertEqual(response.status_code, 405)
