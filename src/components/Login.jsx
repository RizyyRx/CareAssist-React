import axios from 'axios';
import React, { useState } from 'react'

function Login() {
    const [formData,setFormData] = useState( {
        usernameOrEmail:'',
        password:''
    });

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value});
    }

    const [message, setMessage] = useState('')

    const handleSubmit = async (event)=>{
        event.preventDefault()

        try{
            const result = await axios.post('http://localhost:8080/api/auth/login',formData);
            setMessage(JSON.stringify(result.data))
            setFormData({usernameOrEmail:'',password:''})

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
            <input type='text' name='usernameOrEmail' placeholder='UsernameOrEmail or Email' value={formData.usernameOrEmail} onChange={handleChange}></input><br/>
            <input type='text' name='password' placeholder='Password' value={formData.password} onChange={handleChange}></input><br/>
            <button type='submit'>Submit</button>
            {message && <p>{message}</p>}
        </form>
    </div>
  )
}

export default Login