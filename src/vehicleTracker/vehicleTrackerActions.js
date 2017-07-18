import VehicleTrackerAPI from './vehicleTrackerAPI';

const baseURL = 'http://webservices.nextbus.com/service/publicXMLFeed';
const vehicleTrackerAPI = new VehicleTrackerAPI(baseURL);

export const VehicleTrackerActions = {
  RECEIVE_ROUTES: 'RECEIVE_ROUTES',
  RECEIVE_VEHICLES: 'RECEIVE_VEHICLES',
  START_POLLING: 'START_POLLING',
  STOP_POLLING: 'STOP_POLLING',
  ADD_VEHICLE_FILTERS: 'ADD_VEHICLE_FILTERS',
  REMOVE_VEHICLE_FILTERS: 'REMOVE_VEHICLE_FILTERS'
};

export function startPolling(){
  return {
    type: VehicleTrackerActions.START_POLLING
  };
}

export function stopPolling(){
  return {
    type: VehicleTrackerActions.STOP_POLLING
  };
}

export function receiveRoutes(routes) {
  return {
    type: VehicleTrackerActions.RECEIVE_ROUTES,
    routes
  };
}

export function receiveVehicles(vehicles) {
  return {
    type: VehicleTrackerActions.RECEIVE_VEHICLES,
    vehicles
  };
}

export function fetchRoutes(agency){
  return (dispatch) => {
    vehicleTrackerAPI.getRouteList(agency).then(x => dispatch(receiveRoutes(x.routes)))
      .catch(e => console.log('Error', e));
  };
}

export function fetchVehicles(agency, route) {
  return (dispatch) => {
    vehicleTrackerAPI.getVehicleLocations(agency, route).then(x => dispatch(receiveVehicles(x.vehicles)))
      .catch(e => console.log('Error', e));
  };
}

export function addVehicleFilters(routeFilters) {
  return {
    type: VehicleTrackerActions.ADD_VEHICLE_FILTERS,
    routeFilters
  };
}

export function removeVehicleFilters(routeFilters) {
  return {
    type: VehicleTrackerActions.REMOVE_VEHICLE_FILTERS,
    routeFilters
  };
}
