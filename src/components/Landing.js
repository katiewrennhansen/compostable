import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faDesktop, faSeedling } from '@fortawesome/free-solid-svg-icons'


class Landing extends Component {
  render(){
    return (
      <>
      <div className="landing">
        <h1>Compostable</h1>
        <Link to="/map">Find Compost Near You</Link>
      </div>
      <div className="landing-content">
        <h2>How It Works</h2>
        <div className="how-it-works">

          <div className="create-account instructions">
            <FontAwesomeIcon className="landing-icon" icon={faDesktop} />
            <p>Create and account to connect with people composting near you.</p>
          </div>
          <div className="line1"></div>

          <div className="bring-food instructions reverse">
            <FontAwesomeIcon className="landing-icon icon-reverse" icon={faCarrot} />
            <p>Bring your food scraps to a local compost, or recieve scraps from your neighbors.</p>
          </div>
          
          <div className="line2"></div>

          <div className="grow instructions">
            <FontAwesomeIcon className="landing-icon" icon={faSeedling} />
            <p>Reduce waste and help plants grow!</p>
          </div>
        </div>
      </div>
      </>
    );
  }
  
}

export default Landing;