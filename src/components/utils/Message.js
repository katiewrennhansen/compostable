import React, { Component } from 'react'
import messages from '../../messages'

class Message extends Component {

    submitMessage = (e) => {
        e.preventDefault()
        const newMessage = {
            id: 101,
            subject: e.target.title.value,
            body: e.target.message.value,
            read: false,
            sender_id: 1,
            reciever_id: 4,
            date_created: 'December 18, 2019'
        }
        messages.push(newMessage)
        e.target.title.value = ""
        e.target.message.value = ""
        this.props.history.push('/messages')
    }

    render(){
        const id = this.props.match.params.id
        return (
            <div>
                {messages.map(m => {
                    if(m.id == id){
                        return (
                            <div key={m.id}>
                                <div className="single-message">
                                    <p>{m.title}</p>
                                    <p>{m.body}</p>
                                    <p>{m.date_recieved}</p>
                                </div>
                                <form className="reply" onSubmit={(e) => this.submitMessage(e)}>
                                    <label htmlFor="title">Subject</label>
                                    <input type="text" name="title" defaultValue={`Re: ${m.title}`}/>
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" rows="10" placeholder="Message Body Here"/>
                                    <input type="submit" />
                                </form>
                            </div>
                        )
                    }
                })}
                
            </div>
        )
    }

}

export default Message