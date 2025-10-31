import { jwtDecode } from 'jwt-decode';
import React from 'react'

function Home() {

    const decoded = jwtDecode(localStorage.getItem("token"));

    const username = decoded.sub
    const role = decoded.role

  return (
    <div>
        <h1>Home</h1> <br/>
        <p>Welcome {username} <br/> Your role is {role}</p>
    </div>
  )
}

export default Home