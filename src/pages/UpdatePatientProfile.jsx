import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UpdatePatientProfile() {
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        dob:"",
        gender:"",
        contactNumber:"",
        address:"",
        medicalHistory:""
    })

    const token = localStorage.getItem("token")
    const [message, setMessage] = useState('')

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    useEffect(()=>{
       const fetchProfile = async()=>{
            try{
                const result = await axios.get("http://localhost:8080/api/patient/profile",{headers:{Authorization:`Bearer ${token}`}})

                setFormData(result.data)
            } catch (error) {
                if (error.response) {
                setMessage(error.response.data)
                } else {
                setMessage("Unable to fetch profile data.")
                }
            }
        }
        fetchProfile()

    },[]);

    

    const handleSubmit = async (event)=>{
        event.preventDefault()

        try{
            const result = await axios.put("http://localhost:8080/api/patient/update-profile", formData,{headers:{Authorization:`Bearer ${token}`}})
            setMessage(result.data)
        } catch(error){
            if(error.response){
                setMessage(error.response.data);
            } else {
                setMessage("Server not reachable")
            }
        }
    }

  return (
    <div>
        <h1>Update Patient Profile</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange}></input>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
            <select name='gender' value={formData.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="preferNotToSay">Prefer not to say</option>
            </select>
            <input type="number" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input type="text" name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
        {message && <p>{message}</p>}
    </div>

    
  )
}

export default UpdatePatientProfile