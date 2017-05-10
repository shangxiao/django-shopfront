import { combineReducers } from 'redux';

import products from 'apps/products/reducer';
import router from 'apps/router/reducer';

export default combineReducers({
  products,
  router,
});
