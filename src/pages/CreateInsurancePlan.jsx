import React, { useEffect, useState } from 'react'
import axios from 'axios';


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
    const [fetchMessage, setFetchMessage] = useState("");
    const [plans, setPlans] = useState([]);

    const getAllPlans = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/api/insurance-company/get-all",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlans(result.data);
      } catch (error) {
        if (error.response) {
          setFetchMessage(error.response.data.message || JSON.stringify(error.response.data));
        } else {
          setFetchMessage("Server not reachable");
        }
      }
    };

    useEffect(() => {
      getAllPlans();
    }, []);

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
        


        <h2>Available Insurance Plans</h2>
      {plans.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Term</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planName}</td>
                <td>{plan.coverageAmount}</td>
                <td>{plan.premiumAmount}</td>
                <td>{plan.policyTerm}</td>
                <td>{plan.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No plans available</p>
      )}
      {fetchMessage && <p>{fetchMessage}</p>}
    </div>
  )
}

export default CreateInsurancePlan