from django.test import TestCase

from accounts.models import User


class UserTestCase(TestCase):
    """
    Some simple tests to augment login/logout with test_api
    """

    def test_create_user(self):
        user = User.objects.create_superuser('bugs@bunny.com', 'bugsy')
        self.assertEqual(user.get_full_name(), 'bugs@bunny.com')
        self.assertEqual(user.get_short_name(), 'bugs@bunny.com')

    def test_create_superuser(self):
        user = User.objects.create_superuser('bugs@bunny.com', 'bugsy')
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
