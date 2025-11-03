import React from 'react'
import ICNav from '../components/ICNav'
import { Outlet } from 'react-router-dom'

function ICMaster() {
  return (
    <div>
        <ICNav/>
        <Outlet/>
    </div>
  )
}

export default ICMaster