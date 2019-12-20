import React, { Component } from 'react'
import MessagesService from '../../services/messages-service'
import DeleteIcon from '@material-ui/icons/Delete';

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

  deleteMessage = (id) => {
    MessagesService.deleteMessage(id)
      .then(data => {
        this.props.history.push('/messages')
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(m => {
                  return (
                    <tr key={m.id} onClick={() => this.pushHist(m.id)}>
                      <td>To: {m.name}</td>
                      <td>{m.subject}</td>
                      <td>{m.body}</td>
                      <td>{m.date_created.slice(0, 10)}</td>
                      <td>
                        <DeleteIcon onClick={() => this.deleteMessage(m.id)}/>
                      </td>
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