import React from 'react'
import { Link } from 'react-router-dom'

function HPNav() {
  return (
    <div>
        <nav>
            <Link to="hp-home">Home</Link>|{" "}
            <Link to="/logout">Logout</Link>
        </nav>
    </div>
  )
}

export default HPNav