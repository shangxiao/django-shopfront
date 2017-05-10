from django.contrib.auth import get_user_model
from django.test import TestCase

from shop.models import Order, Product


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


class OrderTestCase(TestCase):
    def setUp(self):
        self.bob = get_user_model().objects.create_user(
            username='bob',
            password='bob',
        )
        alice = get_user_model().objects.create_user(
            username='alice',
            password='alice',
        )

        self.black_desk_chair = Product.objects.create(
            name='Svën',
            description='black desk chair',
            price='3.00',
            is_swivel=True,
        )

        self.bob_order = Order.objects.create(
            user=self.bob,
        )
        self.bob_order.products = [self.black_desk_chair]
        self.bob_order.save()

        self.alice_order = Order.objects.create(
            user=alice,
        )
        self.alice_order.products = [self.black_desk_chair]
        self.alice_order.save()

        self.client.force_login(self.bob)

    def test_list_users_see_own_orders(self):
        """
        Users should only be allowed to see their own orders
        """
        response = self.client.get('/api/orders/')

        self.assertEqual(response.status_code, 200)
        orders = response.json()
        self.assertEqual(len(orders), 1)
        self.assertEqual(orders[0]['user'], self.bob.id)
        self.assertEqual(len(orders[0]['products']), 1)
        self.assertEqual(orders[0]['products'][0], self.black_desk_chair.id)

    def test_retrieve_owners_allowed(self):
        """
        An order's user should be allowed to retrieve the order
        """
        response = self.client.get('/api/orders/{}/'.format(self.bob_order.id))

        self.assertEqual(response.status_code, 200)
        order = response.json()
        self.assertEqual(order['id'], self.bob_order.id)

    def test_retrieve_other_user_not_allowed(self):
        """
        Users should not be allowed to see other people's orders
        """
        response = self.client.get('/api/orders/{}/'.format(self.alice_order.id))

        self.assertEqual(response.status_code, 404)