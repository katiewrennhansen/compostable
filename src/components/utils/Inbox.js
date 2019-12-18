import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MessagesService from '../../services/messages-service'

class Inbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  setMessages = messages => {
    this.setState({
      messages
    })
  }

  componentDidMount(){
    MessagesService.getMessages()
      .then(data => {
        this.setMessages(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  setRead(id){
    const updated = {
      read: true
    }
    MessagesService.updateMessage(updated, id)
      .then(data => {
        MessagesService.getMessages()
          .then(data => {
            this.setMessages(data)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    return (
      <div className="inbox">
        <table>
          <thead>
            <tr className="heading">
              <th>Unread</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {this.state.messages.map(m => {
                if(m.read === false && m.reciever_id == 1){
                  return (
                    <tr key={m.id} className="unread">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`} onClick={() => this.setRead(m.id)}>{m.subject}</Link></td>
                      <td>{m.body}</td>
                      <td>{m.date_created}</td>
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
        <table>
          <thead>
            <tr className="heading">
              <th>Read</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(m => {
                if(m.read === true){
                  return (
                    <tr key={m.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`}>{m.subject}</Link></td>
                      <td>{m.body}</td>
                      <td>{m.date_created}</td>
                    </tr>
                  )
                }
              })}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default Inbox;