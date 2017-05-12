import Cookies from 'js-cookie';

export const CSRF_FORM_NAME = 'csrfmiddlewaretoken';
export const CSRF_HEADER_NAME = 'X-CSRFToken';
export const CSRF_COOKIE_NAME = 'csrftoken';

export default function getCsrfValue() {
  return Cookies.get(CSRF_COOKIE_NAME);
}
