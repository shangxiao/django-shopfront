/* eslint-disable no-restricted-syntax */

import getCsrfValue, { CSRF_HEADER_NAME } from 'csrf';

const FETCH_DEFAULTS = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const POST_DEFAULTS = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
};

class FetchError extends Error {
  constructor(response, url, options) {
    super(`Error fetching ${url}: ${response.statusText} (${response.status})`);
    this.simpleMsg = response.statusText;
    this.extra = {
      response, // contains status & headers... could probably trim down to just those...
      url, // response.url may be unreliable https://github.com/github/fetch#obtaining-the-response-url
      options,
    };
  }
}

const checkStatus = (url, options) => (response) => {
  if (response.ok) {
    return response;
  }

  throw new FetchError(response, url, options);
};

export default function fetchResource(url, suppliedOptions = {}) {
  const isPost = suppliedOptions.body instanceof FormData && suppliedOptions.method === 'POST';
  const options = isPost
    ? {
      ...POST_DEFAULTS,
      ...suppliedOptions,
    }
    : {
      ...FETCH_DEFAULTS,
      ...suppliedOptions,
    };

  if (isPost) {
    const body = new URLSearchParams();
    for (const entry of options.body) {
      body.append(entry[0], entry[1]);
    }
    options.body = body;
  }

  const csrftoken = getCsrfValue();
  if (csrftoken) {
    options.headers[CSRF_HEADER_NAME] = csrftoken;
  }

  return fetch(url, options).then(checkStatus(url, options));
}
