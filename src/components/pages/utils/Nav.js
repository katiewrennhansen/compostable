import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../../services/token-service'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            auth: false
        }
    }


    logout = () => {
        TokenService.clearToken()
        sessionStorage.clear()
    }

    loggedIn(){
        return (
            <>
                <Link to='/dashboard'>Dashboard</Link>
                <Link onClick={this.logout} to='/'>Logout</Link>
            </>
        )
    }

    loggedOut(){
        return (
            <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </>
        )
    }

    render(){
        return (
            <nav>
                <Link className="logo" to='/'>Home</Link>
                <div className="nav-links">
                    {TokenService.getToken() ? this.loggedIn() : this.loggedOut()}
                </div>
            </nav>
        );
    }
  
}

export default Dashboard;