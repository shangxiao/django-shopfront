import os

from .settings import *  # NOQA

# see https://docs.djangoproject.com/en/1.11/topics/security/#ssl-https
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# this should only be set for heroku instances, or any hosting that runs a proxy that strips X-Forwarded-Proto
# https://devcenter.heroku.com/articles/http-routing#heroku-headers
if os.getenv('RUN_ON_HEROKU') == 'true':
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
