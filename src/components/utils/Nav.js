import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import MessagesService from '../../services/messages-service'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            unreads: false
        }
    }

    setUnreads = () => {
        this.setState({
            unreads: true
        })
    }

    clearUnreads = () => {
        this.setState({
            unreads: false
        })
    }

    componentDidMount(){
        MessagesService.getNewMessages()
            .then(data => {
                data.map(m => {
                    if(m.read === false){
                        this.setUnreads()
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    logout = () => {
        this.clearUnreads()
        TokenService.clearToken()
        sessionStorage.clear()
    }

    loggedIn(unreads){
        return (
            <>
                <Link to='/map'>Map</Link>
                <Link to='/dashboard'>Account</Link>
                <Link to='/messages'>Messages{(this.state.unreads) ? '*' : null }</Link>
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