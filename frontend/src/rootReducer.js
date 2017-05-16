import { combineReducers } from 'redux';

import auth from 'apps/auth/reducer';
import cart from 'apps/cart/reducer';
import products from 'apps/products/reducer';
import router from 'apps/router/reducer';

export default combineReducers({
  auth,
  cart,
  products,
  router,
});
