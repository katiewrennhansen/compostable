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

  showAddLocation(){
    if(this.state.addlocation){
      this.setState({
        addlocation: false
      })
      document.getElementById('add-location').innerText = 'Add Location'
    } else {
      this.setState({
        addlocation: true
      })
      document.getElementById('add-location').innerText = 'Hide Form'
    }    
  }

  showEditInformation(){
    if(this.state.editaccount){
      this.setState({
        editaccount: false
      })
      document.getElementById('add-location').innerText = 'Add Location'
    } else {
      this.setState({
        editaccount: true
      })
      document.getElementById('add-location').innerText = 'Hide Form'
    } 
  }

  submitUserData = (e) => {
    e.preventDefault()
    const updatedUser = {
      name: e.target.name.value,
      email: e.target.email.value
    }
    
    console.log(updatedUser)
    UserApiService.updateUser(updatedUser)
      .then(data => {
        UserApiService.getUser()
          .then(data => {
            this.setUserData(data)
          })
      })
    this.showEditInformation()
  }

  render(){
    return (
      <div className="App">
        <div className="user-info">
          <h1>Welcome {this.state.userdata.name}</h1>

          {
            (this.state.editaccount) 
            ? (
                <form onSubmit={(e) => {this.submitUserData(e)}}>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" />
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" />
                  <input type="submit"/>
                  <button onClick={() => {this.showEditInformation()}}>Cancel</button>
                </form>
              )
            : (
              <>
                <p>{this.state.userdata.email}</p>
                <p>{this.state.userdata.username}</p>
                <button onClick={() => this.showEditInformation()}>Edit Information</button>
              </>
            )
          }
          
        </div>
        <div className="location">
          <button id="add-location" onClick={() => this.showAddLocation()}>Add Location</button>
          <form className={(this.state.addlocation) ? '' : 'hidden'} onSubmit={(e) => {this.handleFormSubmit(e)}}>
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
      </div>
    );
  }
  
}

export default Dashboard;