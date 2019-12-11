import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            auth: false
        }
    }

    loggedIn(){
        return (
            <>
                <Link to='/'>Logout</Link>
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
                    {(this.state.auth) ? this.loggedIn() : this.loggedOut()}
                </div>
            </nav>
        );
    }
  
}

export default Dashboard;