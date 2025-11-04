import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom'

function PatientHome() {

    const {user} = useAuth();

    return (
        <div>
            <h1>Patient Home</h1> <br/>
            <p>Welcome {user?.username} <br/> Your role is {user?.role}</p>
        </div>
    )
}

export default PatientHome