import React from 'react'
import HPNav from '../../components/healthcareProvider/HPNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

function HPMaster() {
  return (
    <div>
      <HPNav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default HPMaster