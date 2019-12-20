import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import TokenService from '../../services/token-service'
import MessagesService from '../../services/messages-service'

class Popup extends Component {
    constructor(props){
        super(props)
        this.state = {
            showbutton: true,
        }
    }

    sendMessage = (e) => {
        e.preventDefault()
        const newMessage = {
            subject: e.target.title.value,
            body: e.target.message.value,
            read: false,
            reciever_id: this.props.selected.user_id
        }
        MessagesService.postMessage(newMessage)
            .catch(error => {
                console.log(error)
            })
        e.target.title.value = ""
        e.target.message.value = ""
    }

    changeButton = () => {
        this.setState({
            showbutton: false,
        })
    }

    render(){
        return (
            <div
                className="popup"
                latitude={this.props.selected.latitude} 
                longitude={this.props.selected.longitude}
            >
                <CloseIcon
                    fontSize="large"
                    className="close-icon"
                    onClick={() => {
                        this.props.setSelected(null)
                    }}/>
                <h3>{this.props.selected.name}</h3>
                {TokenService.getToken() 
                    ? (
                        <div>
                            <p>{this.props.selected.description}</p>
                            {(this.state.showbutton)
                                ? ( <button id="button" onClick={() => this.changeButton()}>Send Message</button>)
                                : (
                                    <form className="message-form" onSubmit={(e) => this.sendMessage(e)}>
                                        <h3>Message {this.props.selected.name}</h3>
                                        <input type="text" name="title" placeholder="Subject"/>
                                        <textarea name="message" placeholder="Message Body Here"/>
                                        <input type="hidden" name="id" value={this.props.selected.id} />
                                        <input type="submit" value="Send" />
                                    </form> 
                                )
                            }
                        </div>
                    )
                    : (
                        <div className="start-container">
                            <Link className="start" to="/login">Login to Start Composting!</Link>
                        </div>
                        )
                }
            </div>
        )
    }
}

export default Popup