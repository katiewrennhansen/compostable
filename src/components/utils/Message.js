import React, { Component } from 'react'
import MessagesService from '../../services/messages-service'

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

    render(){
        const m = this.state.messages
        const created = m.date_created
        return (
            <div>
                <div key={m.id}>
                    <div className="single-message">
                        <p>{m.subject}</p>
                        <p>{m.body}</p>
                        <p>{created}</p>
                    </div>
                    <form className="reply" onSubmit={(e) => this.submitMessage(e)}>
                        <label htmlFor="title">Subject</label>
                        <input type="text" name="title" defaultValue={`Re: ${m.subject}`}/>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" rows="10" placeholder="Message Body Here"/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        )
    }

}

export default Message