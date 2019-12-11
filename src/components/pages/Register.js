import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Register extends Component {

    handleRegistration = (e) => {
        e.preventDefault()
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value
        }

        console.log(newUser)
        this.props.history.push('/dashboard')
    }

  render(){
    return (
      <>
        <form onSubmit={(e) => {this.handleRegistration(e)}}>
            <h1>Register</h1>
            <div className="form-content">
                <label htmlFor="username">Name: </label>
                <input 
                    type="text"
                    id="name" 
                    name="name" 
                    placeholer="name"
                />
                <label htmlFor="email">Email: </label>
                <input 
                    type="email"
                    id="email" 
                    name="email" 
                    placeholer="email"
                />
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
                <input type="submit" value="Register"/>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </form>
      </>
    );
  }
  
}

export default Register;
