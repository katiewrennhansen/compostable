import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Nav from './components/utils/Nav'
import Context from './contexts/Context'
import PrivateRoute from './components/utils/PrivateRoute'
import PublicRoute from './components/utils/PublicRoute'
import Map from './components/Map'
import Messages from './components/Messages'
import Message from './components/utils/Message'
import NotFound from './components/NotFound'
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
            <PublicRoute
              path='/login'
              component={Login}
            />
            <Route
              path='/register'
              component={Register}
            />
            <Route
              path='/map'
              component={Map}
            />
            <PrivateRoute
              path='/dashboard'
              component={Dashboard}
            />
            <PrivateRoute
              path='/messages'
              component={Messages}
            />
            <Route
              component={NotFound}
            />
        </Switch>
        </div>
      </div>
      </Context.Provider>
    );
  }
  
}

export default withRouter(App);
