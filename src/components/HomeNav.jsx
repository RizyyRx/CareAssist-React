import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function HomeNav() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/">Care <span>Assist</span></Link>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/patient-register">Register</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomeNav;
