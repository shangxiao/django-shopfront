import fetchResource from 'fetchResource';
import { cartReviver } from './models';

export const REQUEST_CART = 'REQUEST_CART';
export const RECEIVE_CART = 'RECEIVE_CART';
export const ERROR_CART = 'ERROR_CART';
export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const RECEIVE_ADD_ITEM = 'RECEIVE_ADD_ITEM';
export const ERROR_ADD_ITEM = 'ERROR_ADD_ITEM';
export const REQUEST_SUBTRACT_ITEM = 'REQUEST_SUBTRACT_ITEM';
export const RECEIVE_SUBTRACT_ITEM = 'RECEIVE_SUBTRACT_ITEM';
export const ERROR_SUBTRACT_ITEM = 'ERROR_SUBTRACT_ITEM';

function requestCart() {
  return {
    type: REQUEST_CART,
  };
}

function receiveCart(data) {
  return {
    type: RECEIVE_CART,
    data,
  };
}

function errorCart(error) {
  return {
    type: ERROR_CART,
    error,
  };
}

function requestAddItem() {
  return {
    type: REQUEST_ADD_ITEM,
  };
}

function receiveAddItem(data) {
  return {
    type: RECEIVE_ADD_ITEM,
    data,
  };
}

function errorAddItem(error) {
  return {
    type: ERROR_ADD_ITEM,
    error,
  };
}

function requestSubtractItem() {
  return {
    type: REQUEST_SUBTRACT_ITEM,
  };
}

function receiveSubtractItem(data) {
  return {
    type: RECEIVE_SUBTRACT_ITEM,
    data,
  };
}

function errorSubtractItem(error) {
  return {
    type: ERROR_SUBTRACT_ITEM,
    error,
  };
}

export function getCart() {
  return (dispatch) => {
    dispatch(requestCart());
    fetchResource('/api/cart/')
      .then(response => response.text())
      .then(text => dispatch(receiveCart(JSON.parse(text, cartReviver))))
      .catch(error => dispatch(errorCart(error)));
  };
}

export function addItem(productId) {
  return (dispatch) => {
    dispatch(requestAddItem());
    fetchResource(`/api/cart/add-item/${productId}/`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(text => dispatch(receiveAddItem(JSON.parse(text, cartReviver))))
      .catch(error => dispatch(errorAddItem(error)));
  };
}

export function subtractItem(productId) {
  return (dispatch) => {
    dispatch(requestSubtractItem());
    fetchResource(`/api/cart/subtract-item/${productId}/`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(text => dispatch(receiveSubtractItem(JSON.parse(text, cartReviver))))
      .catch(error => dispatch(errorSubtractItem(error)));
  };
}
