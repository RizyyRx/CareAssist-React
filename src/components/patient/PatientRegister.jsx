import axios from 'axios'
import React, { useState } from 'react'
import './PatientRegister.css'
import { useNavigate } from 'react-router-dom';
import HomeNav from '../HomeNav';

function Register() {

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
        role:'PATIENT'
    });

    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    // update formData state variable with the target event value
    const handleChange = (event)=>{
      setFormData({...formData,[event.target.name]:event.target.value});
    }

    const handleSubmit= async (event) =>{
      event.preventDefault();

      try{
        const result = await axios.post('http://localhost:8080/api/auth/register',formData);
        setMessage(result.data); // backend url returns message
        setIsRegistered(true);
        setFormData({username:'',email:'',password:'',role:''}) // reset formData to clear the input fields

        // redirect to /login with 2s delay to show success message
        setTimeout(()=>{
          navigate('/login');
        },2000)

      } catch(err){
        if(err.response){
          setMessage(err.response.data);
        } else{
          setMessage('Server not reachable');
        }
        setIsRegistered(false)
      }
    }

  return (

    <div>
      <HomeNav/>
      <div className='register-page'>
        <div className='register-container'>
          <h1>Patient Register</h1>
          <form className='register-form' onSubmit={handleSubmit}>
            <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required></input> <br/>
            <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required></input> <br/>
            <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required></input> <br/> <br/>
            <button type='submit'>Register</button>
            <p>Already registered? <a href='/login'>login here</a></p>
          </form>
          {message && (<p className='register-message'> {message}<br/> {isRegistered? 'Redirecting to login page...': 'Registration failed'}</p>)}
        </div>
      </div>
    </div>
  )
}

export default Register