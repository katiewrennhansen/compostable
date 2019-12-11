import config from '../config'
import TokenService from '../services/token-service'

const UsersApiService = {
    getUser(){
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'GET'
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postUser(obj){
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getUserById(id){
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
}


export default UsersApiService