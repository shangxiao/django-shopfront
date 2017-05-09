import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
} from 'actions/products';

const initialState = {
  fetchingProducts: false,
  products: [],
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        fetchingProducts: true,
      };

    case RECEIVE_PRODUCTS:
      // do something
      return {
        ...state,
        fetchingProducts: false,
        products: action.data,
      };

    default:
      return state;
  }
}
