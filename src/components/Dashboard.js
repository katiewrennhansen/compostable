import React, { Component } from 'react'
import UserApiService from '../services/users-api-service'
import data from '../data'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      userdata: '',
      editaccount: false,
      addlocation: false
    }
  }

  setUserData = userdata => {
    this.setState({
      userdata
    })
  }

  componentDidMount(){
    UserApiService.getUser()
      .then(data => {
        this.setUserData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    let newData = {}
    const [ name, address, city, state, zip_code, description ] = e.target
    const newAddress = `${address.value}, ${city.value} ${state.value}, ${zip_code.value}`
    const endpoint = `http://open.mapquestapi.com/geocoding/v1/address?key=6NILxdy4fJCirPAAZVE4p556vyeQAOi9&location=${newAddress}`
    return fetch(endpoint)
      .then(res => {
        return res.json()
      })
      .then(resJson => {
          newData = {
            id: Math.floor(Math.random() * 1000),
            name: name.value,
            location: {
              lat: resJson.results[0].locations[0].displayLatLng.lat,
              lon: resJson.results[0].locations[0].displayLatLng.lng,
            },
            description: description.value
          }
          data.push(newData)
      })
      .then(() => {
        this.props.history.push('/map')
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    return (
      <div className="App">
        <h1>Welcome {this.state.userdata.name}</h1>
        <p>{this.state.userdata.email}</p>
        <p>{this.state.userdata.username}</p>
        <button>Edit Information</button>
        <button>Add Location</button>
        <form onSubmit={(e) => {this.handleFormSubmit(e)}}>
          <h2>Add Location</h2>

          <label htmlFor="name">Name</label>
          <input type="text" name="name"></input>

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
    );
  }
  
}

export default Dashboard;