import React, { Component } from 'react'
import LocationsService from '../../services/location-service'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class Locations extends Component {
  constructor(props){
    super(props)
    this.state = {
      addlocation: false,
      locations: []
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

  handleFormSubmit = e => {
    e.preventDefault()
    let newData = {}
    const [ address, city, state, zip_code, description ] = e.target
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
                ? this.state.locations.map(l => (
                    <div className="user-address" key={l.id}>
                      <address>
                          <h3>{l.address}</h3>
                          <p>{l.city} {l.state}, {l.zip_code}</p>
                      </address>
                      <p>{l.description}</p>
                      <EditIcon 
                      className="locations-edit-icon"
                        onClick={() => this.updateLocation(l.id)}
                      />
                      <DeleteIcon 
                        className="locations-close-icon" 
                        onClick={() => this.deleteLocation(l.id)}
                      />
                    </div>
                ))
                : (
                    <div>
                        <p>You don't have any locations yet</p>
                    </div>
                )}
            <div className="location-form">
                
                <form className={(this.state.addlocation) ? '' : 'hidden'} onSubmit={(e) => {this.handleFormSubmit(e)}}>
                    <h2>Add Location</h2>

                    <label htmlFor="address">Address</label>
                    <input type="text" name="address"></input>
                    
                    <label htmlFor="city">City</label>
                    <input type="text" name="city"></input>

                    <label htmlFor="state">State</label>
                    <input type="text" name="state"></input>
                    
                    <label htmlFor="zip_code">Zip-Code</label>
                    <input type="number" name="zip_code"></input>

                    <label htmlFor="description">Description</label>
                    <textarea name="description"></textarea>

                    <input type="submit"></input>
                </form>
            </div>
        </div>
        
    );
  }
  
}

export default Locations;