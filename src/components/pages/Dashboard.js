import React, { Component } from 'react'

class Dashboard extends Component {

  render(){
    return (
      <div className="App">
        <h1>Dashboard</h1>
        <p>Welcome {sessionStorage.getItem('user')}</p>
      </div>
    );
  }
  
}

export default Dashboard;