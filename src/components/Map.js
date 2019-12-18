import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import data from '../data'
import RoomIcon from '@material-ui/icons/Room';
import CloseIcon from '@material-ui/icons/Close';
import TokenService from '../services/token-service'
import messages from '../messages'



export default function Map(props) {
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
                                            <button onClick={function(){
                                                const form = document.getElementById('message-form')
                                                form.classList.toggle('hidden')
                                            }}>Message</button>
                                            <form id="message-form" className="hidden" onSubmit={(e) => {
                                                e.preventDefault()
                                                const newMessage = {
                                                    id: 200,
                                                    title: e.target.title.value,
                                                    body: e.target.message.value,
                                                    read: false,
                                                    sender_id: 1,
                                                    reciever_id: 4,
                                                    date_recieved: 'December 18, 2019'
                                                }
                                                messages.push(newMessage)
                                                e.target.title.value = ""
                                                e.target.message.value = ""
                                                const form = document.getElementById('message-form')
                                                form.classList.toggle('hidden')
                                            }}>
                                                <h3>Send {selected.name} a Message</h3>
                                                <input type="text" name="title" placeholder="Subject"/>
                                                <textarea name="message" placeholder="Message Body Here"/>
                                                <input type="submit" />
                                            </form>
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
