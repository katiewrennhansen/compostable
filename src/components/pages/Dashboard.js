import React, { Component } from 'react'
import UserApiService from '../../services/users-api-service'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      userdata: ''
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

  render(){
    return (
      <div className="App">
        <h1>Dashboard</h1>
        <p>Welcome {this.state.userdata.name}</p>
        <p>{this.state.userdata.email}</p>
        <p>{this.state.userdata.username}</p>
      </div>
    );
  }
  
}

export default Dashboard;