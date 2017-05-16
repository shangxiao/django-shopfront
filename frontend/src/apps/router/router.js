/* eslint-disable no-underscore-dangle */

import crossroads from 'crossroads';
import { zipObject } from 'lodash';

import authRoutes from 'apps/auth/routes';
import cartRoutes from 'apps/cart/routes';
import productsRoutes from 'apps/products/routes';
import store from 'store';

import Route from './route';
import history from './history';
import { setLocation, setRoute } from './actions';


function createRoutes() {
  const routes = {
    ...authRoutes,
    ...cartRoutes,
    ...productsRoutes,
  };
  const defaultRoute = '/';

  Object.keys(routes).forEach((route) => {
    crossroads.addRoute(route);
  });

  // make sure we trigger callbacks if we route or bypass more than once
  crossroads.ignoreState = true;

  crossroads.routed.add((request, data) => {
    const page = routes[data.route._pattern];
    const params = zipObject(data.route._paramsIds, data.params);
    store.dispatch(setRoute(new Route(page, params)));
  });

  crossroads.bypassed.add(() => {
    // make sure defaultRoute actually exists!
    crossroads.parse(defaultRoute);
  });

  history.listen((location) => {
    store.dispatch(setLocation(location));
    crossroads.parse(location.pathname);
  });

  crossroads.parse(history.location.pathname);

  return routes;
}

export default createRoutes();
