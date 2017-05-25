import fetchResource from 'fetchResource';

import { productReviver } from './models';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

function receiveProducts(data) {
  return {
    type: RECEIVE_PRODUCTS,
    data,
  };
}

function requestProduct() {
  return {
    type: REQUEST_PRODUCT,
  };
}

function receiveProduct(data) {
  return {
    type: RECEIVE_PRODUCT,
    data,
  };
}

export function getProducts() {
  return (dispatch) => {
    dispatch(requestProducts());
    fetchResource('/api/products/')
      .then(response => response.text())
      .then(text => dispatch(receiveProducts(JSON.parse(text, productReviver))));
  };
}

export function getProduct(id) {
  return (dispatch) => {
    dispatch(requestProduct());
    fetchResource(`/api/products/${id}`)
      .then(response => response.text())
      .then(text => dispatch(receiveProduct(JSON.parse(text, productReviver))));
  };
}
