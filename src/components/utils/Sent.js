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

  render(){
    return (
      <div className="inbox">
        <table>
          <thead>
            <tr className="heading">
              <th>Sent</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(m => {
                if(m.sender_id == 1){
                  return (
                    <tr key={m.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`}>To: {m.reciever_id}</Link></td>
                      <td>{m.subject}</td>
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