import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons' 

export default function Footer() {
    return (
        <footer>
            <FontAwesomeIcon icon={faSeedling} />
            <h2>Compostable</h2>
            <Link to ="https://www.katiewrennhansen.com">katiewrennhansen</Link>
        </footer>
    )
}
