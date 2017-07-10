import VehicleTrackerAPI from './vehicleTrackerAPI';

const baseURL = 'http://webservices.nextbus.com/service/publicXMLFeed';
const vehicleTrackerAPI = new VehicleTrackerAPI(baseURL);


export function fetchRoutes(agency){
  return (dispatch) => {
    vehicleTrackerAPI.getRouteList(agency).then(x => console.log('Success', x)).catch(e => console.log('Error', e));
  };
}