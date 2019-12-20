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
import NotFound from './components/NotFound'
import Footer from './components/utils/Footer'
import TokenService from './services/token-service'
import MessagesService from './services/messages-service'
import './App.css';


class App extends Component {
  static contextType = Context

  constructor(props){
    super(props)
    this.state = {
      user_id: '',
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

  setId = (user_id) => {
    this.setState({
      user_id
    })
  }


  componentDidMount(){
    if(TokenService.getToken()){
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
  }

  render(){
    const contextValue = {
        user_id: this.state.user_id
    }
    return (
      <Context.Provider value={contextValue}>
      <div className="App">
        <Nav 
          setUnreads={this.setUnreads}
          clearUnreads={this.clearUnreads}
          unreads={this.state.unreads}
        />
        <div className="content">
        <Switch>
            <Route
              exact path='/'
              component={Landing}
            />
            <PublicRoute
              path='/login'
              component={() => 
                <Login 
                  setUnreads={this.setUnreads} 
                  history={this.props.history} 
                />
              }
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
              component={() => 
                <Messages
                  clearUnreads={this.clearUnreads}
                  history={this.props.history} 
                />
              }
            />
            <Route
              component={NotFound}
            />
        </Switch>
        </div>
        <Footer />
      </div>
      </Context.Provider>
    );
  }
  
}

export default withRouter(App);
