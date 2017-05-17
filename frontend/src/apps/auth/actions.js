import fetchResource from 'fetchResource';
import { history } from 'apps/router';

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const ERROR_PROFILE = 'ERROR_PROFILE';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';
export const ERROR_SIGNUP = 'ERROR_SIGNUP';

function requestProfile() {
  return {
    type: REQUEST_PROFILE,
  };
}

function receiveProfile(data) {
  return {
    type: RECEIVE_PROFILE,
    data,
  };
}

function errorProfile(error) {
  return {
    type: ERROR_PROFILE,
    error,
  };
}

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

export function getProfile() {
  return (dispatch) => {
    dispatch(requestProfile());
    fetchResource('/accounts/profile/')
      .then(response => response.json())
      .then(data => dispatch(receiveProfile(data)))
      .catch(error => dispatch(errorProfile(error)));
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
