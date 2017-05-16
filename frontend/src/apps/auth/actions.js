import fetchResource from 'fetchResource';
import { history } from 'apps/router';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';
export const ERROR_SIGNUP = 'ERROR_SIGNUP';

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

function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
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

export function login(loginFormData) {
  return (dispatch) => {
    dispatch(requestLogin());
    fetchResource('/accounts/login/', {
      method: 'POST',
      body: loginFormData,
    })
      .then(response => response.json())
      .then((data) => {
        dispatch(receiveLogin(data));
        history.push('/');
      })
      .catch(error => dispatch(errorLogin(error)));
  };
}

export function signup() {
  return (dispatch) => {
    dispatch(requestSignup());
    fetchResource('/accounts/signup/')
      .then(response => response.json())
      .then(data => dispatch(receiveSignup(data)));
  };
}
