import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UsersApiService from '../services/users-api-service'

class Register extends Component {
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
    
    handleRegistration = (e) => {
        e.preventDefault()
        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
            name: e.target.name.value,
            email: e.target.email.value
        }
        UsersApiService.postUser(newUser)
            .then(res => {
                this.props.history.push('/login')
            })
            .catch(error => {
                this.setError(error.error)
            })
    }

  render(){
    return (
      <div className="register">
        <div className="login-image"></div>
        <form className="register-form" onSubmit={(e) => {this.handleRegistration(e)}}>
            <h2>Register</h2>
                <label htmlFor="username">Name: </label>
                <input 
                    type="text"
                    id="name" 
                    name="name" 
                    placeholder="Full Name"
                />
                <label htmlFor="email">Email: </label>
                <input 
                    type="email"
                    id="email" 
                    name="email" 
                    placeholder="Email"
                />
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
                <input type="submit" value="Register"/>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    );
  }
  
}

export default Register;
