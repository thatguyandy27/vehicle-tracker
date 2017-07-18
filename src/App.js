import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import GoogleMap from './googleMap/googleMap.js';
import AppBar from 'material-ui/AppBar';
import AppAside from './appAside/appAside.js';
import {fetchRoutes, fetchVehicles, startPolling, stopPolling, 
  addVehicleFilters, removeVehicleFilters} from './vehicleTracker/vehicleTrackerActions';

class App extends Component {

  componentDidMount() {
    this.props.fetchRoutes(this.props.selectedAgency);
    if(this.props.isPolling) {
      this.poll();
    }
  }

  poll() {
    this.props.fetchVehicles(this.props.selectedAgency);
    this.timeoutHandler = setTimeout(() => this.poll(), this.props.pollingTimeout);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isPolling && !nextProps.isPolling && this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    } else if (!this.props.isPolling && nextProps.isPolling && !this.timeoutHandler) {
      this.poll();
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar title={<span>Vehicle Tracker</span>} /> 
        <div className="Main">
          <AppAside routes={this.props.routes} isPolling={this.props.isPolling}
            startPolling={this.props.startPolling} stopPolling={this.props.stopPolling}
            routeFilter={this.props.routeFilter}  routeFilters={this.props.routeFilters}
            addVehicleFilters={this.props.addVehicleFilters} removeVehicleFilters={this.props.removeVehicleFilters}/> 
          <GoogleMap vehicles={this.props.vehicles} mapOptions={this.props.mapOptions} routes={this.props.routes} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    mapOptions: state.mapOptions,
    routes: state.routes,
    selectedAgency: state.selectedAgency,
    isPolling: state.isPolling,
    vehicles: state.filteredVehicles,
    pollingTimeout: state.pollingTimeout,
    routeFilters: state.routeFilters
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchRoutes: (agency) => dispatch(fetchRoutes(agency)),
    startPolling: () => dispatch(startPolling()),
    stopPolling: () => dispatch(stopPolling()),
    fetchVehicles: (agency, route) => dispatch(fetchVehicles(agency,route)),
    addVehicleFilters: (routeFilters) => dispatch(addVehicleFilters(routeFilters)),
    removeVehicleFilters: (routeFilters) => dispatch(removeVehicleFilters(routeFilters))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
