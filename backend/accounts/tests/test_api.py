from django.contrib.auth import get_user, get_user_model
from django.test import TestCase

UserModel = get_user_model()


class LoginTestCase(TestCase):

    def setUp(self):
        self.bugs = UserModel.objects.create_user(email='bugs@bunny.com', password='bugs')

    def test_login(self):
        """
        Test a basic login with a valid user returns 200 with basic profile information and is added to the session
        """
        response = self.client.post('/accounts/login/', data={
            'email': 'bugs@bunny.com',
            'password': 'bugs',
        })

        self.assertEqual(response.status_code, 200)
        self.assertTrue(get_user(response.wsgi_request).is_authenticated)
        profile = response.json()
        self.assertEqual(profile['email'], 'bugs@bunny.com')

    def test_login_bad_credentials(self):
        """
        Test that incorrect credentials return a 401
        """
        response = self.client.post('/accounts/login/', data={
            'email': 'bugs@bunny.com',
            'password': 'wrong-password',
        })

        self.assertEqual(response.status_code, 401)

    def test_login_inactive(self):
        """
        Test that an inactive user gets a 401
        """
        self.bugs.is_active = False
        self.bugs.save()

        response = self.client.post('/accounts/login/', data={
            'email': 'bugs@bunny.com',
            'password': 'bugs',
        })

        self.assertEqual(response.status_code, 401)

    def test_login_with_get(self):
        """
        Login with GET should be rejected
        """
        response = self.client.get('/accounts/login/', data={
            'email': 'bugs@bunny.com',
            'password': 'bugs',
        })

        self.assertEqual(response.status_code, 405)


class LogoutTestCase(TestCase):
    """
    Not implemented by us, but check here along with other auth tests, make sure settings are correct
    """

    def test_logout(self):
        """
        Logout called on a particular user should clear the session
        """
        bugs = UserModel.objects.create_user(email='bugs@bunny.com', password='bugs')
        self.client.force_login(bugs)

        response = self.client.post('/accounts/logout/')

        self.assertRedirects(response, '/', fetch_redirect_response=False)

        # check that the user is logged out from the session
        self.assertFalse(get_user(response.wsgi_request).is_authenticated)
