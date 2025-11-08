import React from 'react'
import { useAuth } from '../../components/AuthContext';

function AdminHome() {

    const {user} = useAuth();

    return (
        <div>
            <h1>Admin Home</h1> <br/>
            <p>Welcome {user?.username} <br/> Your role is {user?.role}</p>
        </div>
    )
}

export default AdminHome