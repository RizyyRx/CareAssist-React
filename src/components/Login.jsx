import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    const [formData,setFormData] = useState( {
        usernameOrEmail:'',
        password:''
    });

    const {setUser} = useAuth(); // get setUser from context

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value});
    }

    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (event)=>{
        event.preventDefault()

        try{
            const result = await axios.post('http://localhost:8080/api/auth/login',formData);
            // setMessage(JSON.stringify(result.data))
            const token = result.data.accessToken // get token from result
            localStorage.setItem("token",token); //save token to local storage
            setFormData({usernameOrEmail:'',password:''})

            const decoded = jwtDecode(token);
            const role = decoded.role;
            const username = decoded.sub;

            setUser({username,role});

            // Navigate according to role
            if (role === "ROLE_PATIENT") navigate("/patient/patient-home");
            else if (role === "ROLE_HEALTHCARE_PROVIDER") navigate("/hp/hp-home");
            else if (role === "ROLE_INSURANCE_COMPANY") navigate("/ic/ic-home");
            else if (role === "ROLE_ADMIN") navigate("/admin/admin-home");
            else navigate("/unauthorized");

        } catch(err){
            if(err.response){
                setMessage(err.response.data)
            } else{
                setMessage('Server not reachable')
            }
        }
    }

  return (
    <div>
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' name='usernameOrEmail' placeholder='Username or Email' value={formData.usernameOrEmail} onChange={handleChange} required></input><br/>
            <input type='text' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required></input><br/>
            <button type='submit'>Submit</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  )
}

export default Login