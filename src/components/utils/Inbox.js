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
    MessagesService.getNewMessages()
      .then(data => {
        this.setMessages(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  setRead = (id) => {
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

  pushHist(id){
    this.props.history.push(`/messages/${id}`)
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
              <th></th>
            </tr>
          </thead>
          <tbody>
              {this.state.messages.map(m => {
                if(m.read === false){
                  return (
                    <tr key={m.id} onClick={() => this.pushHist(m.id)} className="message unread">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{m.name}</td>
                      <td>{m.subject}</td>
                      <td>{m.body}</td>
                      <td>{m.date_created.slice(0, 10)}</td>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(m => {
                if(m.read === true){
                  return (
                    <tr key={m.id} onClick={() => this.pushHist(m.id)} className="message read">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{m.name}</td>
                      <td>{m.subject}</td>
                      <td>{m.body}</td>
                      <td>{m.date_created.slice(0, 10)}</td>
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