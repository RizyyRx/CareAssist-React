import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

function AdminMaster() {
  return (
    <div>
        <AdminNav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AdminMaster