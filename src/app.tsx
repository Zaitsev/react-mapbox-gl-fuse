import * as  React from 'react';
import {render}    from 'react-dom';
import ReactMapGL  from 'react-map-gl';

import {defaultMapStyle} from './map-style';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./app.css"

const MAPBOX_TOKEN = ""; // eslint-disable-line


class App extends React.Component<any,any> {

  state = {
    mapStyle: defaultMapStyle,
    year: 2015,
    data: null,
    x:0,
    y:0,
    hoveredFeature: null,
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };


  onViewportChange = viewport => this.setState({viewport});

  componentDidMount(): void {
    console.log(this.state.mapStyle)
  }


  render() {

    const {viewport, mapStyle} = this.state;
    return (<>
      <div style={{height: '100%'}}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          onViewportChange={this.onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          >
        </ReactMapGL>


      </div>
    </>);
  }

}

// export function renderToDom(container) {
//   render(<App/>, container);
// }
render(<App/>, document.getElementById('map'));
