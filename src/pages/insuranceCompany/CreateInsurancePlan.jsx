import React, { useState } from 'react'
import axios from 'axios';
import GetInsurancePlans from '../../components/insuranceCompany/GetInsurancePlans';
import SearchSelectedPlans from '../../components/insuranceCompany/SearchSelectedPlans';
import './CreateInsurancePlan.css';


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
        setCreateMessage(result.data);
      } catch(error){
        console.log("Error object:", error);
        console.log("Error.response:", error.response);
        if(error.response){
          setCreateMessage(error.response.data.message || JSON.stringify(error.response.data));
        } else{
          setCreateMessage("Server not reachable");
        }
      }
    }


  return (
    <div className='create-insurance-plan-page'>
        <h1>Create Insurance Plan</h1>
        <div className='form-container'>
          <form className='insurance-plan-form' onSubmit={handleSubmit}>
              <label htmlFor='planName'>Plan Name</label>
              <input type='text' id='planName' name='planName' value={formData.planName} placeholder='Plan Name' onChange={handleChange} required></input>
              <label htmlFor='coverageAmount'>Coverage Amount</label>
              <input type='number' id='coverageAmount' name='coverageAmount' value={formData.coverageAmount} placeholder='Coverage Amount' onChange={handleChange} required></input>
              <label htmlFor='premiumAmount'>Premium Amount</label>
              <input type='number' id='premiumAmount' name='premiumAmount' value={formData.premiumAmount} placeholder='Premium Amount' onChange={handleChange} required></input>
              <label htmlFor='policyTerm'>Policy Term (In months)</label>
              <input type='number' id='policyTerm' name='policyTerm' value={formData.policyTerm} placeholder='Policy Term' onChange={handleChange} required></input>
              <label htmlFor='description'>Description</label>
              <input type='text' id='description' name='description' value={formData.description} placeholder='Description' onChange={handleChange} required></input>
              <button type='submit'>Create plan</button>
              {createMessage && <p>{createMessage}</p>}
          </form>
        </div>
        <div className='available-plans-section'>
          <GetInsurancePlans refreshTrigger={createMessage}/>
        </div>
        <SearchSelectedPlans/>
    </div>
  )
}

export default CreateInsurancePlan