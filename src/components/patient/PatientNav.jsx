import React from 'react'
import { Link } from 'react-router-dom'
import '../Nav.css';

function PatientNav() {
  return (
    <div>
        <nav>
          <div className="nav-container">
            <div className="nav-brand"><Link to="patient-home">Care <span>Assist</span></Link></div>

            <div className="nav-links">
              <Link to="patient-home">Home</Link>
              <Link to="update-patient-profile">Update Profile</Link>
              <Link to="select-insurance-plan">Select Plan</Link>
              <Link to="current-invoices">Invoices</Link>
              <Link to="submit-claim">Claims</Link>
              <Link to="current-payments">Payments</Link>
              <Link to="/logout">Logout</Link>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default PatientNav