
const defaultState = {
  mapOptions: {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 13
  },
  selectedAgency: 'sf-muni'
};

function reducer(state = defaultState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default reducer;
