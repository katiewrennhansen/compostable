import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
  render(){
    return (
      <div className="landing">
        <h1>Compostable</h1>
        <Link to="/map">Find Compost Near You</Link>
      </div>
    );
  }
  
}

export default Landing;