import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './UpdatePatientProfile.css'

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
    const [originalData, setOriginalData] = useState({});
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    // Runs after ui is rendered. Will re-render the ui after this function is complete
    useEffect(()=>{
       const fetchProfile = async()=>{
            try{
                const result = await axios.get("http://localhost:8080/api/patient/profile",{headers:{Authorization:`Bearer ${token}`}})

                setFormData(result.data) // set the present value to form data
                setOriginalData(result.data);
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

    useEffect(() => {
        if (message) {
            setTimeout(() => {
            setMessage("");
            }, 5000);
        }
    }, [message]);


    const handleSubmit = async (event)=>{
        event.preventDefault()

        try{
            const result = await axios.put("http://localhost:8080/api/patient/update-profile", formData,{headers:{Authorization:`Bearer ${token}`}})
            setMessage(result.data)
            setOriginalData(formData);

        } catch (error) {
            if (error.response) {
                const data = error.response.data;

                if (typeof data === "object") {
                    const formatted = Object.values(data).join(", ");
                    setMessage(formatted);
                }
                else {
                    setMessage(data);
                }
            } else {
                setMessage("Server not reachable");
            }
        }
    }

  return (
        <div className="update-profile-page">
  <div className="update-profile-container">
    <h1>Update Patient Profile</h1>

    <form className="update-profile-form" onSubmit={handleSubmit}>
      <div className="form-grid">

        <div className="form-column">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} required />

          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

          <label htmlFor="contactNumber">Contact Number</label>
          <input type="number" id="contactNumber" name="contactNumber" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange} required />
        </div>

        <div className="form-column">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} required />

          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="preferNotToSay">Prefer not to say</option>
          </select>

          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} required />
        </div>

      </div>

      <label htmlFor="medicalHistory">Medical History</label>
      <input type="text" id="medicalHistory" name="medicalHistory" placeholder="Enter medical history" value={formData.medicalHistory} onChange={handleChange} />

      <button type="submit" disabled={!isFormChanged}>Save Changes</button>
    </form>

    {message && <p className="update-message">{message}</p>}
  </div>
</div>


    
  )
}

export default UpdatePatientProfile