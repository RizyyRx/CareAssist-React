import React from 'react'
import { Link } from 'react-router-dom'

function PatientNav() {
  return (
    <div>
        <nav>
            <Link to="patient-home">Home</Link>|{" "}
            <Link to="update-patient-profile">Update Profile</Link>|{" "}
            <Link to="select-insurance-plan">Select Plan</Link>|{" "}
            <Link to="current-invoices">Invoices</Link>|{" "}
            <Link to="submit-claim">Claims</Link>|{" "}
            <Link to="/logout">Logout</Link>
        </nav>
    </div>
  )
}

export default PatientNav