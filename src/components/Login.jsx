import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData,setFormData] = useState( {
        usernameOrEmail:'',
        password:''
    });

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

            // Navigate according to role
            if (role === "ROLE_PATIENT") navigate("/patient-home");
            else if (role === "ROLE_HEALTHCARE_PROVIDER") navigate("/hp-home");
            else if (role === "ROLE_INSURANCE_COMPANY") navigate("/ic-home");
            else if (role === "ROLE_ADMIN") navigate("/admin-home");
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
            <input type='text' name='usernameOrEmail' placeholder='Username or Email' value={formData.usernameOrEmail} onChange={handleChange}></input><br/>
            <input type='text' name='password' placeholder='Password' value={formData.password} onChange={handleChange}></input><br/>
            <button type='submit'>Submit</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  )
}

export default Login