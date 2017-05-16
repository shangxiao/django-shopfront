import history from './history';
import Route from './route';

import {
  LOCATION_CHANGE,
  ROUTE_CHANGE,
} from './actions';


const initialState = {
  location: history.location,
  route: new Route(),
};

export default function router(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.location,
      };

    case ROUTE_CHANGE:
      return {
        ...state,
        route: action.route,
      };

    default:
      return state;
  }
}
