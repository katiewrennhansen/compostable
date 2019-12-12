import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth-service'
import TokenService from '../../services/token-service'
import Context from '../../contexts/Context'

class Login extends Component {
    static contextType = Context 

    handleLogin = (e) => {
        e.preventDefault()
        const authUser = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        AuthService.postLogin(authUser)
            .then(res => {
                TokenService.saveToken(res.token)
                this.props.history.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
            })
        e.target.username.value = ''
        e.target.password.value = ''
    }


  render(){
    return (
      <>
        <form onSubmit={(e) => this.handleLogin(e)}>
            <h1>Login</h1>
            <label htmlFor="username">Username: </label>
            <input 
                type="text"
                id="username" 
                name="username" 
                placeholer="username"
            />
            <label htmlFor="password">Password: </label>
            <input 
                type="password"
                id="password" 
                name="password" 
                placeholer="password"
            />
            <input type="submit" value="Login"/>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </form>
      </>
    );
  }
}

export default Login;