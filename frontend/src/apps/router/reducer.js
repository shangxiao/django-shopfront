import history from './history';
import Route from './route';

const LOCATION_CHANGE = 'LOCATION_CHANGE';
const ROUTE_CHANGE = 'ROUTE_CHANGE';

export function setLocation(location) {
  return {
    type: LOCATION_CHANGE,
    location,
  };
}

export function setRoute(route) {
  return {
    type: ROUTE_CHANGE,
    route,
  };
}

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
