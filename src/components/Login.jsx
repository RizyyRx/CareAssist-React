import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';
import HomeNav from './HomeNav';

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
                const data = err.response.data;
                if (typeof data === "object") {
                    const allMessages = Object.values(data).join(" | ");
                    setMessage(allMessages);
                } 
                else{
                    setMessage(data);
                } 
            } else{
                setMessage('Server not reachable')
            }
        }
    }

  return (
    <div>
        <HomeNav/>
        <div className="login-page">
            <div className="login-container">
                <h1>Login Here</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" name="usernameOrEmail" placeholder="Username or Email" value={formData.usernameOrEmail} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Submit</button>
                <div className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></div>
                {message && <p className="login-message">{message}</p>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login