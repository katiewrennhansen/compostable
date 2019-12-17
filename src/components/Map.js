import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import data from '../data'
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import TokenService from '../services/token-service'


export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: 35.7883046,
        longitude: -78.7811964,
        zoom: 10,
        width: '100vw',
        height: '70vh'
    });

    const [selected, setSelected] = useState(null)


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
      <div className="map">
        <div id="map">
          <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken='pk.eyJ1Ijoia2F3cmVubiIsImEiOiJjazQ5eXQyZnEwOXJnM2twbzhkZDcyaGNoIn0.MLpQQjuYYTECfMbhjNp9uA'
            onViewportChange={viewport => setViewport(viewport)}
            mapStyle="mapbox://styles/kawrenn/ck49zf8ug0j0d1cqiglffmllj"
            className="map"
          >
              {
                  data.map(item => (
                        <Marker 
                            key={item.id} 
                            latitude={item.location.lat} 
                            longitude={item.location.lon}
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
                    {selected ? (
                        <div
                            className="popup"
                            latitude={selected.location.lat} 
                            longitude={selected.location.lon}
                        >
                            <CloseIcon
                                fontSize="large"
                                className="close-icon"
                                onClick={() => {
                                    setSelected(null)
                                }}/>
                            <h2>{selected.name}</h2>
                            { 
                                TokenService.getToken() 
                                    ? (
                                        <div>
                                            <p>{selected.description}</p>
                                            <button>Message</button>
                                        </div>
                                    )
                                    : (<Link to="/login">Login to View Details</Link>)
                            }
                        </div>
                        ) 
                    : null}
          </ReactMapGL>
        </div>
        <h1>Map</h1>
      </div>
    );
  
}
