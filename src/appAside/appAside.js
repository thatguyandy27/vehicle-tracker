import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import RouteFilter from '../routeFilter/routeFilter';
import RaisedButton from 'material-ui/RaisedButton';
import './appAside.css';

class AppAside extends Component {
  
  render() {
    return <aside className="App-aside">
      <Drawer open={true} width={300}> 
        <div className="App-aside-container">
          <div className="App-logo">
          </div>
           <div>
            { 
               this.props.isPolling ?
               <RaisedButton secondary={true} onClick={this.props.stopPolling} fullWidth={true} label="Pause Updates" /> : 
               <RaisedButton primary={true} onClick={this.props.startPolling} fullWidth={true} label="Resume Updates" /> 
            }
          </div>
          <RouteFilter 
            addVehicleFilters={this.props.addVehicleFilters}
            routes={this.props.routes}
            routeFilters={this.props.routeFilters}
            removeVehicleFilters={this.props.removeVehicleFilters}
          />
        </div>
      </Drawer> 
    </aside>;
  }
}

export default AppAside;
