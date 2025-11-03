import React from 'react'
import HPNav from '../components/HPNav'
import { Outlet } from 'react-router-dom'

function HPMaster() {
  return (
    <div>
      <HPNav/>
      <Outlet/>
    </div>
  )
}

export default HPMaster