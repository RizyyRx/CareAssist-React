import React from 'react'
import { Link } from 'react-router-dom'

function ICNav() {
  return (
    <div>
        <nav>
            <Link to="ic-home">Home</Link>|{" "}
            <Link to="create-insurance-plan">Insurance Plans</Link>|{" "}
            <Link to="all-claims">Claim Requests</Link>|{" "}
            <Link to="process-payment">Payments</Link>|{" "}
            <Link to="/logout">Logout</Link>
        </nav>
    </div>
  )
}

export default ICNav