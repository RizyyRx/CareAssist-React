import React from 'react'
import PatientNav from '../../components/patient/PatientNav'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

function PatientMaster() {
  return (
    <div>
        <PatientNav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PatientMaster