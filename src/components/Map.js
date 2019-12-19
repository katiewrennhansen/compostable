import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import data from '../data'
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import TokenService from '../services/token-service'
import MessagesService from '../services/messages-service'
import LocationsService from '../services/location-service'



export default function Map(props) {
    const [viewport, setViewport] = useState({
        latitude: 35.7883046,
        longitude: -78.7811964,
        zoom: 10,
        width: '100vw',
        height: '70vh'
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
              {
              locations.map(item => (
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
                    {selected ? (
                        <div
                            className="popup"
                            latitude={selected.latitude} 
                            longitude={selected.longitude}
                        >
                            <CloseIcon
                                fontSize="large"
                                className="close-icon"
                                onClick={() => {
                                    setSelected(null)
                                }}/>
                            <h2>{selected.description}</h2>
                            {
                                TokenService.getToken() 
                                    ? (
                                        <div>
                                            <p>{selected.description}</p>
                                            <button onClick={function(){
                                                const form = document.getElementById('message-form')
                                                form.classList.toggle('hidden')
                                            }}>Message</button>
                                            <form id="message-form" className="hidden" onSubmit={(e) => {
                                                e.preventDefault()
                                                const newMessage = {
                                                    id: 200,
                                                    subject: e.target.title.value,
                                                    body: e.target.message.value,
                                                    read: false,
                                                    reciever_id: 5
                                                }
                                                MessagesService.postMessage(newMessage)
                                                e.target.title.value = ""
                                                e.target.message.value = ""
                                                const form = document.getElementById('message-form')
                                                form.classList.toggle('hidden')
                                            }}>
                                                <h3>Send {selected.name} a Message</h3>
                                                <input type="text" name="title" placeholder="Subject"/>
                                                <textarea name="message" placeholder="Message Body Here"/>
                                                <input type="hidden" name="id" value={selected.id} />
                                                <input type="submit" />
                                            </form>
                                        </div>
                                    )
                                    : (<Link to="/login">Login to Start Composting!</Link>)
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
