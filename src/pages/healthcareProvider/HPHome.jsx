import React from 'react'
import { useAuth } from '../../components/AuthContext';

function HPHome() {

    const {user} = useAuth();

    return (
        <div>
            <h1>Healthcare Provider Home</h1> <br/>
            <p>Welcome {user?.username} <br/> Your role is {user?.role}</p>
        </div>
    )
}

export default HPHome