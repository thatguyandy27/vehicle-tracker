/*global google*/
import React, {Component} from 'react';
import _ from 'lodash';
import './googleMaps.css';

class GoogleMap extends Component {

  constructor(props){
    super(props);
    this.customIconInline = 'data:image/svg+xml;utf-8, ' + 
      encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="#AF1E2C" width="24" height="24" viewBox="0 0 24 24"><path d="M19 16.94V8.5c0-2.79-2.61-3.4-6.01-3.49l.76-1.51H17V2H7v1.5h4.75l-.76 1.52C7.86 5.11 5 5.73 5 8.5v8.44c0 1.45 1.19 2.66 2.59 2.97L6 21.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 20h-.08c1.69 0 2.58-1.37 2.58-3.06zm-7 1.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4.5H7V9h10v5z"/></svg>');

  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapElement, this.props.mapOptions);
    this.markers = [];
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicles) {
      this.markers.forEach(x => x.setMap(null));
      this.markers = [];
    }

    this.markers = nextProps.vehicles.map( v => {
      const marker = new google.maps.Marker({
        position: { lat: Number(v.lat), lng: Number(v.lon) },
        map: this.map,
        icon: this.customIconInline
      });

      let route = _.find(this.props.routes, r => r.tag === v.routeTag);
      
      const infowindow = new google.maps.InfoWindow({
        content: `<div class="Maps-info">
          <ul class="Maps-info-list">
            <li><span class="Maps-info-label">Route: </span> <span>${v.routeTag}</span></li>
            <li><span class="Maps-info-label">Route Name: </span><span>${route ? route.title : ''}</span></li>
            <li><span class="Maps-info-label">Vehicle Id: </span><span>${v.id} </span></li>
          </ul>
        </div>`,
        maxWidth: 200
      });

      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });

      return marker;
    });
  }


  render() {
    return <div id="map" style={ {height: "100%"} } ref={(mapElement) => this.mapElement = mapElement}></div>;
  }
}

export default GoogleMap;
