import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';

function ICNav() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="ic-home">Care <span>Assist</span></Link>
          </div>

          <div className="nav-links">
            <Link to="ic-home">Home</Link>
            <Link to="create-insurance-plan">Insurance Plans</Link>
            <Link to="all-claims">Claim Requests</Link>
            <Link to="process-payment">Payments</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default ICNav