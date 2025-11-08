import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import { Outlet } from 'react-router-dom'

function AdminMaster() {
  return (
    <div>
        <AdminNav/>
        <Outlet/>
    </div>
  )
}

export default AdminMaster