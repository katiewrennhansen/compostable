import React from 'react'

export default function LocationForm(props){
    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h2>{props.type} Location</h2>

            <label htmlFor="address">Address</label>
            <input 
                type="text" 
                name="address" 
                defaultValue={props.location.address}
            />

            <label htmlFor="city">City</label>
            <input 
                type="text" 
                name="city" 
                defaultValue={props.location.city}    
            />

            <label htmlFor="state">State</label>
            <input 
                type="text" 
                name="state" 
                defaultValue={props.location.state}
            />

            <label htmlFor="zip_code">Zip-Code</label>
            <input 
                type="number" 
                name="zip_code" 
                defaultValue={props.location.zip_code}
            />

            <label htmlFor="description">Description</label>
            <textarea 
                name="description" 
                defaultValue={props.location.description}    
            />

            <input type="hidden" name="id" value={props.location.id} />

            <input type="submit" value="Save"></input>
        </form>
    )
}