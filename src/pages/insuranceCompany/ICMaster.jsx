import React from 'react'
import ICNav from '../../components/insuranceCompany/ICNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

function ICMaster() {
  return (
    <div>
        <ICNav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default ICMaster