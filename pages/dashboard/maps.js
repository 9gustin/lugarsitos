import React from 'react';
import { Wrapper, Status, useDeepCompareEffectForMaps } from "@googlemaps/react-wrapper";

import {getElements} from '../../services/firebase'

const Map = ({children}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions({
        center: {
          lat: -31.274782,
          lng: -64.304577,
      },
      zoom: 10
      });
    }
  }, [map]);

  return <>   
    <div ref={ref} style={{width: '100vh', height: '100vh'}}/> 
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
  </> 
}

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

export default function Home() {
  const [state, setState] = React.useState([])

  React.useEffect(() => {
    getElements().then(data => {
      const mapp = data.map(({location}) => ({
        lat: location.latitude,
        lng: location.longitude
      }));
      setState(mapp)
    })
  }, [])

  const render = (status) => {
    console.warn("st", status)
    return <h1>{status}</h1>;
  };

  return (<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render}>
    <Map>
      {state.map(position => (
        <Marker position={position} />
      ))}
    </Map>
  </Wrapper>)
}
