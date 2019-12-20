import React, { Component } from 'react'
import { Switch, Link, withRouter } from 'react-router-dom'
import Message from './utils/Message'
import Inbox from './utils/Inbox'
import Sent from './utils/Sent'
import PrivateRoute from './utils/PrivateRoute'

class Messages extends Component {
 
  render(){
    return (
      <div className="messages">
        <h1>Messages</h1>
        <aside className="messages-nav">
          <Link to="/messages">Inbox</Link>
          <Link to="/messages/sent">Sent</Link>
        </aside>
          <Switch>
            <PrivateRoute 
              exact path='/messages'
              component={() => 
                <Inbox
                  clearUnreads={this.props.clearUnreads}
                  history={this.props.history} 
                />
              }
            />
            <PrivateRoute 
              exact path='/messages/sent'
              component={Sent}
            />
            <PrivateRoute 
              path='/messages/:id'
              component={Message}
            />
          </Switch>
      </div>
    );
  }
  
}

export default withRouter(Messages);