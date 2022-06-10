import React from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { CgCloseO } from "react-icons/cg";

import { getElements } from '../../services/firebase'

import { useSession } from '../../context/session'

const CENTER = {
  lat: -33.9336327,
  lng: -61.282298,
}

const ModalContext = React.createContext()

const ModalProvider = ({ children }) => {
  const [data, setData] = React.useState(null)

  return (
    <ModalContext.Provider value={{ data, setData }}>
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = React.useContext(ModalContext);

  return context;
}

const Map = ({ children }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();
  const { data, setData } = useModal()

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions({
        center: CENTER,
        zoom: 6
      });
    }
  }, [map]);

  const handleClose = () => {
    setData(null);
    map.setOptions({
      zoom: 8
    });
  }

  return <>
    {
      data && (
        <div style={{
          position: 'absolute',
          borderRadius: '6px 6px 0 0',
          bottom: 0,
          left: 10,
          right: 70,
          backgroundColor: '#fff',
          zIndex: 9,
          border: '1px solid #000',
          maxWidth: '400px',
          maxHeight: '90%',
          overflow: 'scroll'
        }}>
          <CgCloseO color='#000' onClick={handleClose} style={{
            position: 'absolute',
            right: 0,
            margin: 10,
            height: '24px',
            width: '24px',
          }} />
          {data.imageUrl && (
            <div style={{ overflow: 'hidden', height: '300px', objectFit: 'contain' }}>
              <img src={data.imageUrl} style={{ width: '100%' }} />
            </div>
          )}
          <div style={{
            padding: '10px',
            overflow: 'hidden'
          }}>
            <h1 style={{ fontWeight: 'bold', marginBottom: 8 }}>{data.title}</h1>
            <p>{
              new Date(data.date.seconds * 1000).toLocaleString(
                "es",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour12: true,
                }
              )} </p>
            <p style={{
              marginTop: 8

            }}>{data.description}
            </p>
          </div>
        </div>
      )
    }
    <div ref={ref} style={{ width: '100%', height: '100vh' }} />
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
  </>
}

const Marker = ({ data, map }) => {
  const [marker, setMarker] = React.useState();
  const { setData } = useModal()


  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({
        map,
        title: data.title,
        position: data.position
      }));
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  marker?.addListener("click", () => {
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    setData(data)
  });

  return null;
};

function Home() {
  const [state, setState] = React.useState([])

  React.useEffect(() => {
    getElements().then(data => {
      const mapp = data.map(({ location, title, description, date, imageUrl }) => ({
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
        title, description, date, imageUrl
      }));
      setState(mapp)
    })
  }, [])

  const render = (status) => {
    return <h1>{status}</h1>;
  };
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render}>
      <ModalProvider>
        <Map>
          {state.map(position => (
            <Marker data={position} key={position.title} />
          ))}
        </Map>
      </ModalProvider>
    </Wrapper>
  )
}

export default function HomeLoad() {
  const { user } = useSession()
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
