import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MessagesService from '../../services/messages-service'

class Sent extends Component {

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
    MessagesService.getSentMessages()
      .then(data => {
        this.setMessages(data)
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
              <th>Sent</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(m => {
                  return (
                    <tr key={m.id} onClick={() => this.pushHist(m.id)}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>To: {m.name}</td>
                      <td>{m.subject}</td>
                      <td>{m.body}</td>
                      <td>{m.date_created.slice(0, 10)}</td>
                    </tr>
                  )
              })}
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default Sent;