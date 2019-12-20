import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import RoomIcon from '@material-ui/icons/Room';
import LocationsService from '../services/location-service'
import Popup from './utils/Popup'

export default function Map(props) {
    const [viewport, setViewport] = useState({
        latitude: 35.7883046,
        longitude: -78.7811964,
        zoom: 10,
        width: '100vw',
        height: '100vh',
    });

    const [selected, setSelected] = useState(null)

    const [locations, setLocations] = useState([])

    useEffect(() => {
        const listener = e => {
            if(e.key === 'Escape'){
                setSelected(null);
            }
        };
        window.addEventListener("keydown", listener)

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, []);
    
    return (
      <div className="map-container">
        <div id="map">
          <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoia2F3cmVubiIsImEiOiJjazQ5eXQyZnEwOXJnM2twbzhkZDcyaGNoIn0.MLpQQjuYYTECfMbhjNp9uA'
            onViewportChange={viewport => setViewport(viewport)}
            mapStyle="mapbox://styles/kawrenn/ck49zf8ug0j0d1cqiglffmllj"
            className="map"
            onLoad={() => {
                LocationsService.getAllLocations()
                    .then(data => {
                        setLocations(data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }}
          >
            <h1>Find a Compost Near You</h1>
              {locations.map(item => (
                        <Marker 
                            key={item.id} 
                            latitude={Number(item.latitude)} 
                            longitude={Number(item.longitude)}
                        >
                            <button className='click-btn' onClick={(e) => {
                                e.preventDefault()
                                setSelected(item)
                            }}>
                                <RoomIcon 
                                    fontSize="large"
                                    className="icon"
                                />
                            </button>  
                      </Marker>
                    ))}
                    {selected 
                        ? (
                        <Popup 
                            selected={selected}
                            setSelected={setSelected}
                        />
                        ) 
                        : null
                    }
          </ReactMapGL>
        </div>
      </div>
    );
  
}
