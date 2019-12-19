import TokenService from './token-service'
import config from '../config'


const LocationsService = {
    getAllLocations(){
        return fetch(`${config.API_ENDPOINT}/locations`, {
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
    }
}


export default LocationsService