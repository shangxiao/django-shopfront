import { Product } from './models';
import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCT,
  RECEIVE_PRODUCT,
} from './actions';

const initialState = {
  fetchingProducts: false,
  products: [],

  // a single product
  fetchingProduct: false,
  product: new Product(),
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        fetchingProducts: true,
      };

    case RECEIVE_PRODUCTS:
      return {
        ...state,
        fetchingProducts: false,
        products: action.data,
      };

    case REQUEST_PRODUCT:
      return {
        ...state,
        product: new Product(),
        fetchingProduct: true,
      };

    case RECEIVE_PRODUCT:
      return {
        ...state,
        fetchingProduct: false,
        product: action.data,
      };

    default:
      return state;
  }
}
