import { jwtDecode } from 'jwt-decode';
import React from 'react'

function PatientHome() {

    const token = localStorage.getItem("token")

    if(!token){
        return <h2>You are not authorized to access this page</h2>
    }
    
    try{
        const decoded = jwtDecode(token);
        const username = decoded.sub
        const role = decoded.role

        if(role !== "ROLE_PATIENT"){
            return <h2>You are not authorized to access this page</h2>
        }

        return (
            <div>
                <h1>Patient Home</h1> <br/>
                <p>Welcome {username} <br/> Your role is {role}</p>
            </div>
        )
    } catch (error){
        console.error("Invalid token:", error);
        return <h2>You are not authorized to access this page</h2>;
    }
}

export default PatientHome