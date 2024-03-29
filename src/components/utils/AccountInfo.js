import React, { Component } from 'react'
import UserApiService from '../../services/users-api-service'

class AccountInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: null,
      userdata: '',
      editaccount: false
    }
  }

  setUserData = userdata => {
    this.setState({
      userdata
    })
  }

  setError = error => {
    this.setState({
      error
    })
  }

  componentDidMount(){
    UserApiService.getUser()
      .then(data => {
        this.setUserData(data)
      })
      .catch(error => {
        this.setError(error.error)
      })
  }

  showEditInformation(){
    if(this.state.editaccount){
      this.setState({
        editaccount: false
      })
    } else {
      this.setState({
        editaccount: true
      })
    } 
  }

  submitUserData = (e) => {
    e.preventDefault()
    const updatedUser = {
      name: e.target.name.value,
      email: e.target.email.value
    }
    UserApiService.updateUser(updatedUser)
      .then(data => {
        UserApiService.getUser()
          .then(data => {
            this.setUserData(data)
          })
      })
    this.showEditInformation()
  }

  render(){
    return (
        <div className="user-info">
          <h1>Welcome {this.state.userdata.username}</h1>
            {(this.state.editaccount) 
              ? (
                  <form onSubmit={(e) => {this.submitUserData(e)}}>
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      defaultValue={this.state.userdata.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      defaultValue={this.state.userdata.email}
                    />
                    <input type="submit"/>
                    <button onClick={() => {this.showEditInformation()}}>Cancel</button>
                  </form>
                )
              : (
                <>
                  <p>{this.state.userdata.name}</p>
                  <p>{this.state.userdata.email}</p>
                  <button onClick={() => this.showEditInformation()}>Edit Information</button>
                </>
              )
            }
          </div>
    );
  }
  
}

export default AccountInfo;