import React from 'react'
import { Link } from 'react-router-dom'

function ICNav() {
  return (
    <div>
        <nav>
            <Link to="ic-home">Home</Link>|{" "}
            <Link to="/logout">Logout</Link>|{" "}
            <Link to="create-insurance-plan">Insurance Plans</Link>
        </nav>
    </div>
  )
}

export default ICNav