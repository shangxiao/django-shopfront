import fetchResource from 'fetchResource';

export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const RECEIVE_ADD_ITEM = 'RECEIVE_ADD_ITEM';
export const ERROR_ADD_ITEM = 'ERROR_ADD_ITEM';

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

export function addItem(productId) {
  return (dispatch) => {
    dispatch(requestAddItem());
    fetchResource('/api/cart/add-item/', {
      method: 'POST',
      data: JSON.stringify({
        productId,
      }),
    })
      .then(response => response.json())
      .then(data => dispatch(receiveAddItem(data)))
      .catch(error => dispatch(errorAddItem(error)));
  };
}
