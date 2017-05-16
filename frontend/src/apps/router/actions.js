export const LOCATION_CHANGE = 'LOCATION_CHANGE';
export const ROUTE_CHANGE = 'ROUTE_CHANGE';

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
