import convert from 'xml-js';

class VehicleTrackerAPI {
  constructor(baseURL){
    this.baseURL = baseURL;
  }

  getRouteList(agency) {
    return fetch(`${this.baseURL}?command=routeList&a=${agency}`).then(resp => resp.text()).then(
      xml => ({ routes: convert.xml2js(xml, {compact: true}).body.route.map(v => ({...v._attributes})) }));
  }

  getVehicleLocations(agency, route) {
    let url = `${this.baseURL}?command=vehicleLocations&a=${agency}&t=0`;
    if (route) { 
      url += `&r=${route}`;
    }

    return fetch(url).then(resp => resp.text()).then(xml => ({ 
      vehicles: convert.xml2js(xml, {compact: true}).body.vehicle.map(v => ({...v._attributes})) 
    }));
  }
}

export default VehicleTrackerAPI;
