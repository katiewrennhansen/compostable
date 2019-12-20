import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth-service'
import TokenService from '../services/token-service'
import MessagesService from '../services/messages-service'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    setError = error => {
        this.setState({
          error
        })
      }

    handleLogin = (e) => {
        e.preventDefault()
        const authUser = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        AuthService.postLogin(authUser)
            .then(res => {
                TokenService.saveToken(res.token)
            })
            .then(() => {
                this.props.history.push('/dashboard')
                MessagesService.getNewMessages()
                    .then(data => {
                        data.forEach(m => {
                            if(m.read === false){
                                this.props.setUnreads()
                            }
                        })
                    })
            })
            .catch(error => {
                this.setError(error.error)
            })
        e.target.username.value = ''
        e.target.password.value = ''
    }


  render(){
    return (
      <div className="login">
        <div className="login-image"></div>
        <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
            <h2>Login</h2>
            {(this.state.error) ? <p>{this.state.error}</p> : null}
            <label htmlFor="username">Username: </label>
            <input 
                type="text"
                id="username" 
                name="username" 
                placeholder="Username"
            />
            <label htmlFor="password">Password: </label>
            <input 
                type="password"
                id="password" 
                name="password" 
                placeholder="Password"
            />
            <input type="submit" value="Login"/>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;