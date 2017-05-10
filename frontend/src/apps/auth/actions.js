import fetchResource from 'fetchResource';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
  };
}

function receiveLogin(data) {
  return {
    type: RECEIVE_LOGIN,
    data,
  };
}

function requestSignup() {
  return {
    type: REQUEST_SIGNUP,
  };
}

function receiveSignup(data) {
  return {
    type: RECEIVE_SIGNUP,
    data,
  };
}

export function login() {
  return (dispatch) => {
    dispatch(requestLogin());
    fetchResource('/api/login/')
      .then(response => response.json())
      .then(data => dispatch(receiveLogin(data)));
  };
}

export function signup() {
  return (dispatch) => {
    dispatch(requestSignup());
    fetchResource('/api/signup/')
      .then(response => response.json())
      .then(data => dispatch(receiveSignup(data)));
  };
}
