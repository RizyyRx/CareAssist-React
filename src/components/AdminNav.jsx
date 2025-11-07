import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';

function AdminNav() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="admin-home">Care <span>Assist</span></Link>
          </div>

          <div className="nav-links">
            <Link to="admin-home">Home</Link>
            <Link to="manage-accounts">Manage Accounts</Link>
            <Link to="admin-register">Register</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNav