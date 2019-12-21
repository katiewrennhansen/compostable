import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons' 

export default function Footer() {
    return (
        <footer>
            <div className="footer-logo">
                <h2>Compostable</h2>
                <FontAwesomeIcon icon={faSeedling} />
            </div>
            <div className="credit">
                <a href ="https://www.katiewrennhansen.com" target="_blank" rel="noopener noreferrer" >katiewrennhansen</a>
            </div>
        </footer>
    )
}
