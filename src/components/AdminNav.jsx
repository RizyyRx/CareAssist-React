import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <div>
        <nav>
            <Link to="admin-home">Home</Link>
        </nav>
    </div>
  )
}

export default AdminNav