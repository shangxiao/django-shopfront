import Cookies from 'js-cookie';

export const FETCH_DEFAULTS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default function fetchResource(url, suppliedOptions) {
  const options = {
    ...FETCH_DEFAULTS,
    ...suppliedOptions,
  };
  const csrftoken = Cookies.get('csrftoken');
  if (csrftoken) {
    options.headers['X-CSRFToken'] = csrftoken;
  }
  return fetch(url, options);
}
