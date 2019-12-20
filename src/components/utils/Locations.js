import React, { Component } from 'react'
import LocationsService from '../../services/location-service'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocationForm from './LocationForm'

class Locations extends Component {
  constructor(props){
    super(props)
    this.state = {
      addlocation: false,
      locations: [],
      editlocation: false
    }
  }

  setLocations = locations => {
    this.setState({
      locations
    })
  }

  componentDidMount(){
    LocationsService.getLocationsForUser()
      .then(data => {
        this.setLocations(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  addLocation = e => {
    e.preventDefault()
    let newData = {}
    const { address, city, state, zip_code, description } = e.target
    const newAddress = `${address.value}, ${city.value} ${state.value}, ${zip_code.value}`
    const endpoint = `http://open.mapquestapi.com/geocoding/v1/address?key=6NILxdy4fJCirPAAZVE4p556vyeQAOi9&location=${newAddress}`
    return fetch(endpoint)
      .then(res => {
        return res.json()
      })
      .then(resJson => {
          newData = {
            latitude: resJson.results[0].locations[0].displayLatLng.lat,
            longitude: resJson.results[0].locations[0].displayLatLng.lng,
            description: description.value,
            address: address.value,
            city: city.value,
            state: state.value,
            zip_code: zip_code.value
          }
          LocationsService.postLocation(newData)
            .catch(error => {
              console.log(error)
            })
      })
      .then(() => {
        this.props.history.push('/map')
      })
      .catch(error => {
        console.log(error)
      })
  }

  showAddLocation(){
    if(this.state.addlocation){
      this.setState({
        addlocation: false
      })
    } else {
      this.setState({
        addlocation: true
      })
    }    
  }

  showEditLocation(){
    if(this.state.editlocation){
      this.setState({
        editlocation: false
      })
    } else {
      this.setState({
        editlocation: true
      })
    }    
  }

  editLocation = (e) => {
    e.preventDefault()
    let updatedLocation = {}
    const id = e.target.id.value
    const { address, city, state, zip_code, description } = e.target
    const newAddress = `${address.value}, ${city.value} ${state.value}, ${zip_code.value}`
    const endpoint = `http://open.mapquestapi.com/geocoding/v1/address?key=6NILxdy4fJCirPAAZVE4p556vyeQAOi9&location=${newAddress}`
    return fetch(endpoint)
      .then(res => {
        return res.json()
      })
      .then(resJson => {
          updatedLocation = {
            latitude: resJson.results[0].locations[0].displayLatLng.lat,
            longitude: resJson.results[0].locations[0].displayLatLng.lng,
            description: description.value,
            address: address.value,
            city: city.value,
            state: state.value,
            zip_code: zip_code.value
          }
          LocationsService.updateLocation(id, updatedLocation)
            .then(data => {
              LocationsService.getLocationsForUser()
                .then(data => {
                  this.setLocations(data)
                })
                .catch(error => {
                  console.log(error)
                })
            })
            .catch(error => {
              console.log(error)
            })
      })
      .then(() => {
        this.showEditLocation()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteLocation = (id) => {
    LocationsService.deleteLocation(id)
      .then(data => {
        LocationsService.getLocationsForUser()
          .then(data => {
            this.setLocations(data)
          })
          .catch(error => {
            console.log(error)
          })
      })
  }

  render(){
    return (
        <div className="location">
          <div className="header-grid">
            <h2>My Locations</h2>
            <AddIcon 
              className="add-icon" 
              fontSize="large" 
              onClick={() => this.showAddLocation()} 
            />
          </div>
            {(this.state.locations.length >= 1)
                ? this.state.locations.map(l => {
                  if(!this.state.editlocation){
                    return (
                      <div className="user-address" key={l.id}>
                        <address>
                            <h3>{l.address}</h3>
                            <p>{l.city} {l.state}, {l.zip_code}</p>
                        </address>
                        <p>{l.description}</p>
                        <EditIcon 
                          className="locations-edit-icon"
                          onClick={() => this.showEditLocation()}
                        />
                        <DeleteIcon 
                          className="locations-close-icon" 
                          onClick={() => this.deleteLocation()}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div className="edit-location" key={l.id}>
                        <LocationForm 
                          type="Edit"
                          location={l}
                          handleSubmit={this.editLocation}
                        />
                        <button onClick={() => this.showEditLocation()}>Cancel</button>
                      </div>
                    )
                  }})
                : (
                    <div>
                        <p>You don't have any locations yet</p>
                    </div>
                )}
            <div className="location-form">
              {(this.state.addlocation) 
                ? (<>
                  <LocationForm 
                    type="Add"
                    location={[]}
                    handleSubmit={this.addLocation}
                  />
                  <button onClick={() => this.showAddLocation()}>Cancel</button>
                  </>
                )
                : null
              }
            </div>
        </div>
        
    );
  }
  
}

export default Locations;