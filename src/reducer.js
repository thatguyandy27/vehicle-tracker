import { VehicleTrackerActions } from './vehicleTracker/vehicleTrackerActions';
import _ from 'lodash';

const defaultState = {
  mapOptions: {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 13
  },
  selectedAgency: 'sf-muni',
  routes: [],
  vehicles: [],
  filteredVehicles: [],
  isPolling: true,
  routeFilters: [],
  pollingTimeout: 15000
};

function reducer(state = defaultState, action) {
  let routeFilters;

  switch(action.type) {
    case VehicleTrackerActions.RECEIVE_ROUTES: 
      return Object.assign({}, state, { routes: action.routes });
    case VehicleTrackerActions.START_POLLING: 
      return Object.assign({}, state, { isPolling: true });
    case VehicleTrackerActions.STOP_POLLING: 
      return Object.assign({}, state, { isPolling: false });
    case VehicleTrackerActions.RECEIVE_VEHICLES: 
      return Object.assign({}, state, { 
        vehicles: action.vehicles,
        filteredVehicles: filterVehicles(action.vehicles, state.routeFilters)
      });
    case VehicleTrackerActions.REMOVE_VEHICLE_FILTERS:
      routeFilters =  _.filter(state.routeFilters, (f) => action.routeFilters.indexOf(f) === -1);
      return Object.assign({}, state, { 
        routeFilters,
        filteredVehicles: filterVehicles(state.vehicles, routeFilters)
      });
    case VehicleTrackerActions.ADD_VEHICLE_FILTERS: 
      // prevent dupe filters.
      routeFilters = [...state.routeFilters, ..._.filter(action.routeFilters, (f) => 
       state.routeFilters.indexOf(f) === -1 ) ];
      return Object.assign({}, state, {
        routeFilters,
        filteredVehicles: filterVehicles(state.vehicles, routeFilters)
      })
    default:
      return state;
  }
}

function filterVehicles(vehicles, routeFilters) {
  if (!routeFilters.length) {
    return [...vehicles];
  }

  return vehicles.filter(x =>  routeFilters.some(routeFitler => x.routeTag === routeFitler ) );
}

export default reducer;
