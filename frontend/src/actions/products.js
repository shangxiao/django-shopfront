import fetchResource from 'fetchResource';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

export function receiveProducts(data) {
  return {
    type: RECEIVE_PRODUCTS,
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
