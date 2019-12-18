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
              <th>Unread</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {messages.map(m => {
                if(m.read === false && m.reciever_id == 1){
                  return (
                    <tr key={m.id} className="unread">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`} onClick={() => this.setRead(m.id)}>{m.title}</Link></td>
                      <td>{m.body}</td>
                      <td>{m.date_recieved}</td>
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
            {messages.map(m => {
                if(m.read === true){
                  return (
                    <tr key={m.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td><Link to={`/messages/${m.id}`}>{m.title}</Link></td>
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