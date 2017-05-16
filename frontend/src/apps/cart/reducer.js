import {
  REQUEST_ADD_ITEM,
  RECEIVE_ADD_ITEM,
  ERROR_ADD_ITEM,
} from './actions';

import { Cart } from './models';

const initialState = {
  cart: new Cart(),
  isAddingItem: false,
  isRemovingItem: false,
};

export default function products(state = initialState, action) {
  switch (action.type) {
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
      };

    default:
      return state;
  }
}
