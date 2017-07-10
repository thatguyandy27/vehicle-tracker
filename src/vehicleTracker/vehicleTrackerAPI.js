import xml2json from 'xml2json';

class VehicleTrackerAPI {
  constructor(baseURL){
    this.baseURL = baseURL;
  }

  getRouteList(agency) {
    return fetch(`${this.baseURL}?command=routeList&a=${agency}`).then(resp => resp.text()).then(xml => xml2json.toJson(xml) );
  }
}


export default VehicleTrackerAPI;

