import React from 'react'
import { Link } from 'react-router-dom'
import '../Nav.css';

function HPNav() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="hp-home">Care <span>Assist</span></Link>
          </div>

          <div className="nav-links">
            <Link to="hp-home">Home</Link>
            <Link to="create-invoice">Invoices</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HPNav