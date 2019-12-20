import React, { Component } from 'react'
import Locations from '../components/utils/Locations'
import AccountInfo from './utils/AccountInfo'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }

  render(){
    return (
      <div className="dashboard">
        <AccountInfo />
        <Locations 
          history={this.props.history}
        />
      </div>
    );
  }
  
}

export default Dashboard;