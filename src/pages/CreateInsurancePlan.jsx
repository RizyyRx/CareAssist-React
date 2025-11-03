import React, { useState } from 'react'

function CreateInsurancePlan() {

    const [formData, setFormData] = useState({
        planName: "",
        coverageAmount:"" ,
        premiumAmount: "",
        policyTerm: "",
        description: ""
    })

    const handleChange = (event)=>{
      setFormData({...formData, [event.target.name]:event.target.value})
    }


  return (
    <div>
        <h1>Create Insurance Plan</h1>

        <form>
            <input type='text' name='planName' value={formData.planName} placeholder='Plan Name' onChange={handleChange} required></input>
            <input type='number' name='coverageAmount' value={formData.coverageAmount} placeholder='Coverage Amount' onChange={handleChange} required></input>
            <input type='number' name='premiumAmount' value={formData.premiumAmount} placeholder='Premium Amount' onChange={handleChange} required></input>
            <input type='number' name='policyTerm' value={formData.policyTerm} placeholder='Policy Term' onChange={handleChange} required></input>
            <input type='text' name='description' value={formData.description} placeholder='Description' onChange={handleChange} required></input>
        </form>
    </div>
  )
}

export default CreateInsurancePlan