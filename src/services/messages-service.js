import TokenService from './token-service'
import config from '../config'

const MessagesService = {
    getMessages(){
        return fetch(`${config.API_ENDPOINT}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${TokenService.getToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postMessage(obj){
        return fetch(`${config.API_ENDPOINT}/messages`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(obj)
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res
        )
    },
    updateMessage(obj, id){
        return fetch(`${config.API_ENDPOINT}/messages/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify(obj)
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res
        )
    },
}


export default MessagesService