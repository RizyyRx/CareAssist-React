import React from 'react'
import PatientNav from '../../components/patient/PatientNav'
import { Outlet } from 'react-router-dom'

function PatientMaster() {
  return (
    <div>
        <PatientNav/>
        <Outlet/>
    </div>
  )
}

export default PatientMaster