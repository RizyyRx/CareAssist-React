import React from 'react'
import PatientNav from '../components/PatientNav'
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