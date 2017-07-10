import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './googleMap/googleMap.js';
import AppBar from 'material-ui/AppBar';
import {fetchRoutes} from './vehicleTracker/vehicleTrackerAPI';

class App extends Component {

  componentDidMount() {
    this.props.fetchRoutes(this.props.selectedAgency);
  }

  render() {
    console.log(this.props.mapOptions);
    return (
      <div className="App">
        <AppBar title={<span>Vehicle Tracker</span>} /> 
        <div className="Main" style={ {height: "100%"} }>
          <GoogleMap mapOptions={this.props.mapOptions} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    mapOptions: state.mapOptions,
    selectedAgency: state.selectedAgency
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchRoutes: (agency) => dispatch(fetchRoutes(agency))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
