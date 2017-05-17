import {
  REQUEST_CART,
  RECEIVE_CART,
  ERROR_CART,
  REQUEST_ADD_ITEM,
  RECEIVE_ADD_ITEM,
  ERROR_ADD_ITEM,
  REQUEST_SUBTRACT_ITEM,
  RECEIVE_SUBTRACT_ITEM,
  ERROR_SUBTRACT_ITEM,
} from './actions';

import { Cart } from './models';

const initialState = {
  cart: new Cart(),
  isFetchingCart: false,
  isAddingItem: false,
  isSubtractingItem: false,
  error: null,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CART:
      return {
        ...state,
        isFetchingCart: true,
      };

    case RECEIVE_CART:
      return {
        ...state,
        isFetchingCart: false,
        cart: action.data,
      };

    case ERROR_CART:
      return {
        ...state,
        isFetchingCart: false,
        error: action.error,
      };

    case REQUEST_ADD_ITEM:
      return {
        ...state,
        isAddingItem: true,
      };

    case RECEIVE_ADD_ITEM:
      return {
        ...state,
        isAddingItem: false,
        cart: action.data,
      };

    case ERROR_ADD_ITEM:
      return {
        ...state,
        isAddingItem: false,
        error: action.error,
      };

    case REQUEST_SUBTRACT_ITEM:
      return {
        ...state,
        isSubtractingItem: true,
      };

    case RECEIVE_SUBTRACT_ITEM:
      return {
        ...state,
        isSubtractingItem: false,
        cart: action.data,
      };

    case ERROR_SUBTRACT_ITEM:
      return {
        ...state,
        isSubtractingItem: false,
        error: action.error,
      };

    default:
      return state;
  }
}
