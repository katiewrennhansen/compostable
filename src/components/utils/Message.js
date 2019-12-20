import React, { Component } from 'react'
import MessagesService from '../../services/messages-service'
import DeleteIcon from '@material-ui/icons/Delete';

class Message extends Component {
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
        const id = this.props.match.params.id
        MessagesService.getMessageById(id)
          .then(data => {
            const newDate = data.date_created.split('T')[0]
            data.date_created = newDate
            this.setMessages(data)
          })
          .catch(error => {
            console.log(error)
          })
      }

    submitMessage = (e) => {
        e.preventDefault()
        const newMessage = {
            subject: e.target.title.value,
            body: e.target.message.value,
            read: false,
            reciever_id: this.state.messages.sender_id,
        }
        MessagesService.postMessage(newMessage)
            .catch(error => {
                console.log(error)
            })
        e.target.title.value = ""
        e.target.message.value = ""
        this.props.history.push('/messages')
    }

    deleteMessage = (id) => {
      MessagesService.deleteMessage(id)
        .then(data => {
          this.props.history.push('/messages')
        })
        .catch(error => {
          console.log(error)
        })
    }

    render(){
        const m = this.state.messages
        return (
            <div>
                <div key={m.id}>
                    <div className="single-message">
                        <p>From: {m.name}</p>
                        <p>Subject: {m.subject}</p>
                        <p>Message: {m.body}</p>
                        <p>Sent On: {m.date_created}</p>
                        <DeleteIcon className="delete-icon" onClick={() => this.deleteMessage(m.id)} />
                    </div>
                    <form className="reply" onSubmit={(e) => this.submitMessage(e)}>
                        <label htmlFor="title">Subject</label>
                        <input type="text" name="title" defaultValue={`Re: ${m.subject}`}/>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" rows="10" placeholder="Message Body Here"/>
                        <input type="submit" value="Send"/>
                    </form>
                </div>
            </div>
        )
    }

}

export default Message