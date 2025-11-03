import React from 'react'
import { useAuth } from '../components/AuthContext';

function ICHome() {
    
    const {user} = useAuth();

    return (
        <div>
            <h1>Insurance Company Home</h1> <br/>
            <p>Welcome {user?.username} <br/> Your role is {user?.role}</p>
        </div>
    )
}

export default ICHome