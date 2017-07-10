/*global google*/
import React, {Component} from 'react';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapElement, this.props.mapOptions);
  }

  render() {
    return <div id="map" style={ {height: "100%"} } ref={(mapElement) => this.mapElement = mapElement}></div>;
  }
}

export default GoogleMap;
