import React from 'react'
import Locations from '../components/utils/Locations'
import AccountInfo from './utils/AccountInfo'

function Dashboard(props) {
    return (
      <div className="dashboard">
        <AccountInfo />
        <Locations 
          history={props.history}
        />
      </div>
    );  
}

export default Dashboard;