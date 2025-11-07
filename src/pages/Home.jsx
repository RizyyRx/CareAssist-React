import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeNav from '../components/HomeNav';

function Home() {

    const navigate = useNavigate();
    const handleRegister = ()=>{
        navigate('/patient-register')
    }

  return (
    <div>
        <HomeNav/>
        <h1>Welcome to Care Assist</h1>
        <button onClick={handleRegister}>Register</button>
    </div>
    
  )
}

export default Home