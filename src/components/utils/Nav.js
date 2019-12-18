import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

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
                <Link to='/map'>Map</Link>
                <Link to='/dashboard'>Account</Link>
                <Link to='/messages'>Messages</Link>
                <Link onClick={this.logout} to='/'>Logout</Link>
            </>
        )
    }

    loggedOut(){
        return (
            <>
                <div></div>
                <Link to='/map'>Map</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </>
        )
    }

    render(){
        return (
            <nav>
                <Link className="logo" to='/'>Compostable</Link>
                <div className="nav-links">
                    {TokenService.getToken() ? this.loggedIn() : this.loggedOut()}
                </div>
            </nav>
        );
    }
  
}

export default Dashboard;