import { combineReducers } from 'redux';

import auth from 'apps/auth/reducer';
import products from 'apps/products/reducer';
import router from 'apps/router/reducer';

export default combineReducers({
  auth,
  products,
  router,
});
