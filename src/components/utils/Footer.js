import React from 'react'
import { Link } from 'react-router-dom'
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
                <Link to ="https://www.katiewrennhansen.com">katiewrennhansen</Link>
            </div>
        </footer>
    )
}
