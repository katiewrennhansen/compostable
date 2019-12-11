import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Nav from './components/pages/utils/Nav'
import Context from './contexts/Context'
import './App.css';


class App extends Component {
  static contextType = Context

  constructor(props){
    super(props)
    this.state = {
      user_id: ''
    }
  }

  setId = (user_id) => {
    this.setState({
      user_id
    })
  }

  render(){
    const contextValue = {
        user_id: this.state.user_id
    }
    return (
      <Context.Provider value={contextValue}>
      <div className="App">
        <Nav />
        <div className="content">
        <Switch>
            <Route
              exact path='/'
              component={Landing}
            />
            <Route 
              path='/login'
              render={(history) => {
                return (
                <Login 
                  setId={this.setState}
                  history={history}
                />
                )
              }}
              // component={Login}

            />
            <Route
              path='/register'
              component={Register}
            />
            <Route
              path='/dashboard'
              component={Dashboard}
            />
        </Switch>
        </div>
      </div>
      </Context.Provider>
    );
  }
  
}

export default withRouter(App);
