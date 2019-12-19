import TokenService from './token-service'
import config from '../config'


const LocationsService = {
    getAllLocations(){
        return fetch(`${config.API_ENDPOINT}/locations`, {
            method: 'GET'
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getLocationsForUser(){
        return fetch(`${config.API_ENDPOINT}/locations/all`, {
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
    postLocation(obj){
        return fetch(`${config.API_ENDPOINT}/locations`, {
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
                : res.json()
        )
    },
    deleteLocation(id){
        return fetch(`${config.API_ENDPOINT}/locations/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${TokenService.getToken()}`
            },
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res
        )
    }
}


export default LocationsService