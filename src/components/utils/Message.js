import React, { Component } from 'react'
import messages from '../../messages'

class Message extends Component {

    render(){
        const id = this.props.match.params.id
        return (
            <div>
                <h3>Single Message</h3>
                {messages.map(m => {
                    if(m.id == id){
                        return (
                            <div key={m.id}>
                                <p>{m.title}</p>
                                <p>{m.body}</p>
                                <p>{m.date_recieved}</p>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

}

export default Message