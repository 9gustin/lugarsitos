import React from 'react';
import { Wrapper, Status, useDeepCompareEffectForMaps } from "@googlemaps/react-wrapper";

const Map = ({}) => {
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
      zoom: 15
      });
    }
  }, [map]);

  return <div ref={ref} style={{width: '100vh', height: '100vh'}}/>
}

export default function Home() {
  const render = (status) => {
    console.warn("st", status)
    return <h1>{status}</h1>;
  };



  return (<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render}>
    <Map/>
  </Wrapper>)
}
