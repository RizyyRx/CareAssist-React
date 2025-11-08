import axios from 'axios'
import React, { useState } from 'react'
import '../patient/PatientRegister.css'

function Register() {

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
        role:''
    });

    const [message, setMessage] = useState('');

    // update formData state variable with the target event value
    const handleChange = (event)=>{
      setFormData({...formData,[event.target.name]:event.target.value});
    }

    const handleSubmit= async (event) =>{
      event.preventDefault();

      try{
        const result = await axios.post('http://localhost:8080/api/auth/register',formData);
        setMessage(result.data); // backend url returns message
        setFormData({username:'',email:'',password:'',role:''}) // reset formData to clear the input fields

      } catch(err){
        if(err.response){
          setMessage(err.response.data);
        } else{
          setMessage('Server not reachable');
        }
      }
    }

  return (
    <div className='register-page'>
      <div className='register-container'>
        <h1>Register Here</h1>
        <form className='register-form' onSubmit={handleSubmit}>
          <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required></input> <br/>
          <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required></input> <br/>
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required></input> <br/>
          <select name='role' value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option> 
              <option value="PATIENT">Patient</option>
              <option value="HEALTHCARE_PROVIDER">Healthcare Provider</option>
              <option value="INSURANCE_COMPANY">Insurance Company</option>
              <option value="ADMIN">Admin</option>
          </select> <br/>
          <button type='submit'>Register</button>
          <p>Already registered? <a href='/login'>login here</a></p>
        </form>
        {message && (<p className='register-message'> {message}</p>)}
      </div>

    </div>
  )
}

export default Register