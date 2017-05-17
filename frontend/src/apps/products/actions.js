import fetchResource from 'fetchResource';

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
      .then(response => response.json())
      .then(data => dispatch(receiveProducts(data)));
  };
}

export function getProduct(id) {
  return (dispatch) => {
    dispatch(requestProduct());
    fetchResource(`/api/products/${id}`)
      .then(response => response.json())
      .then(data => dispatch(receiveProduct(data)));
  };
}
