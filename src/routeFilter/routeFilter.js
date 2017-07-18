import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/content/clear';
import _ from 'lodash';

class RouteFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorText: '',
      searchText: ''
    }
    this.onNewRequest = this.onNewRequest.bind(this);
  }

  onNewRequest(value){
    if (typeof value === 'string') {
      value = value.toUpperCase();
      const firstValue = _.find(this.props.routes, (r) => r.tag.indexOf(value) > -1);
      if (firstValue) {
        this.props.addVehicleFilters([firstValue.tag]);
        this.setState({
          searchText: ''
        });
      } else {
        this.setState({
          errorText: `No route with value of ${value}`
        });
      }
    } else { // if we have the value then we go with it
      this.props.addVehicleFilters([value.tag]);
      this.setState({
        searchText: ''
      });
    }
  }

  render() {
    return <div> 
      <AutoComplete hintText="Search Routes"
          dataSource={this.props.routes}
          dataSourceConfig={{
            text: 'tag',
            value: 'tag'
          }}
          filter={(searchText, key) => searchText !== '' && key.indexOf(searchText.toUpperCase()) !== -1	}
          openOnFocus={true}
          onUpdateInput={(searchText) => this.setState({searchText, errorText: ''})}
          onNewRequest={this.onNewRequest }
          searchText={this.state.searchText}
          errorText={this.state.errorText}
          menuProps={ {maxHeight: 300 }}
        />
        <section className="App-selected-routes">
          { this.props.routeFilters.length === 0 ? <h4>All routes selected</h4> : <h4>Selected Routes:</h4>}
          <ul> 
            { this.props.routeFilters.map(x => 
              <li key={x} className="Selected-route">
                  <div className="Selected-route-label">{`Route ${x}`}</div>
                  <IconButton title="Remove Selected Route" className="Selected-route-remove" 
                    iconStyle={{fill: 'red'}} onClick={() => this.props.removeVehicleFilters([x])} >}
                    <Delete />
                  </IconButton>
              </li>
              )}
          </ul>
        </section>
    </div>;
  }

}

export default RouteFilter;
