import React, { useState } from 'react'
import axios from 'axios';
import GetInsurancePlans from '../components/GetInsurancePlans';


function CreateInsurancePlan() {

    const [formData, setFormData] = useState({
        planName: "",
        coverageAmount:"" ,
        premiumAmount: "",
        policyTerm: "",
        description: ""
    })

    const token = localStorage.getItem("token")

    const handleChange = (event)=>{
      setFormData({...formData, [event.target.name]:event.target.value})
    }

    const [createMessage, setCreateMessage] = useState("");

    const handleSubmit = async (event)=>{
      event.preventDefault();

      try{
        const result = await axios.post("http://localhost:8080/api/insurance-company/create", formData,{headers:{Authorization:`Bearer ${token}`}})
        setCreateMessage(result.data.message || JSON.stringify(result.data));
        getAllPlans()
      } catch(error){
        if(error.response){
          setCreateMessage(error.response.data.message || JSON.stringify(error.response.data));
        } else{
          setCreateMessage("Server not reachable")
        }
      }
    }


  return (
    <div>
        <h1>Create Insurance Plan</h1>

        <form onSubmit={handleSubmit}>
            <input type='text' name='planName' value={formData.planName} placeholder='Plan Name' onChange={handleChange} required></input>
            <input type='number' name='coverageAmount' value={formData.coverageAmount} placeholder='Coverage Amount' onChange={handleChange} required></input>
            <input type='number' name='premiumAmount' value={formData.premiumAmount} placeholder='Premium Amount' onChange={handleChange} required></input>
            <input type='number' name='policyTerm' value={formData.policyTerm} placeholder='Policy Term' onChange={handleChange} required></input>
            <input type='text' name='description' value={formData.description} placeholder='Description' onChange={handleChange} required></input>
            <button type='submit'>Create plan</button>
        </form>
        {createMessage && <p>{createMessage}</p>}
        {<GetInsurancePlans/>}
    </div>
  )
}

export default CreateInsurancePlan