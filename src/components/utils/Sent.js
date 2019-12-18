import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import messages from '../../messages'

class Inbox extends Component {

  setRead(id){
    messages.map(m => {
      if(m.id == id){
        m.read = true
      }
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
            {messages.map(m => {
                if(m.sender_id == 1){
                  return (
                    <tr key={m.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`}>To: {m.reciever_id}</Link></td>
                      <td>{m.title}</td>
                      <td>{m.body}</td>
                      <td>{m.date_recieved}</td>
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