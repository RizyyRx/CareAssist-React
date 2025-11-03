import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div>
        <nav>
            <Link to="admin-home">Home</Link>
            <Link to="/logout">Logout</Link>
        </nav>
    </div>
  )
}

export default AdminNav