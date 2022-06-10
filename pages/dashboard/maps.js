import React from 'react';
import { Wrapper, Status, useDeepCompareEffectForMaps } from "@googlemaps/react-wrapper";

import {getElements} from '../../services/firebase'

import {useSession} from '../../context/session'

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
      zoom: 5
      });
    }
  }, [map]);

  return <>   
    <div ref={ref} style={{width: '100%', height: '100vh'}}/> 
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

function Home() {
  const [state, setState] = React.useState([])

  React.useEffect(() => {
    getElements().then(data => {
      console.warn(data)
      const mapp = data.map(({location, title, description, date, imageUrl}) => ({
        lat: location.latitude,
        lng: location.longitude,
        title, description, date, imageUrl
      }));
      setState(mapp)
    })
  }, [])

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render}>
    <Map>
      {state.map(position => (
        <Marker position={position} key={'1'}/>
      ))}
    </Map>
  </Wrapper>)
}

export default function HomeLoad () {
  const {user} = useSession()
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    if (!user) [
      window.location.href = '/'
    ]
  }, [])

  if (!mounted) return null;



  return user ? <Home /> : null
}
