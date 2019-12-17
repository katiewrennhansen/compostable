import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
  render(){
    return (
      <div className="landing">
        <h1>Landing</h1>
        <Link to="/map">View Map</Link>
      </div>
    );
  }
  
}

export default Landing;