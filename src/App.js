import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Nav from './components/pages/utils/Nav'
import './App.css';


class App extends Component {
  render(){
    return (
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
              component={Login}
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
    );
  }
  
}

export default withRouter(App);
