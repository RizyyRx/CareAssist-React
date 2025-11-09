import React from 'react'
import ICNav from '../../components/insuranceCompany/ICNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

function ICMaster() {
  return (
    <div className="app-container">
      <ICNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ICMaster
