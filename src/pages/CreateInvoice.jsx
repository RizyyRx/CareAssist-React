import React, { useState } from 'react'
import GetAllPatients from '../components/GetAllPatients';
import axios from "axios";
import PatientInvoiceById from '../components/PatientInvoiceById';


function CreateInvoice() {

    const [formData, setFormData] = useState({
        patientId: "",
        consultationFee: "",
        diagnosticTestsFee: "",
        diagnosticScanFee: "",
        medicationFee: ""
    })

    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleChange = (event)=>{
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/api/provider/create-invoice", formData, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(result.data || "Invoice created successfully!");
    } catch (error) {
      if (error.response) setMessage(error.response.data || "Failed to create invoice");
      else setMessage("Server not reachable");
    }
  };

  return (
    <div>
        <h2>Create Invoice</h2>

        <form onSubmit={handleSubmit}>
            <input type='number' name='patientId' placeholder='Patient ID' value={formData.patientId} onChange={handleChange} required></input>
            <input type='number' name='consultationFee' placeholder='Consultation Fee' value={formData.consultationFee} onChange={handleChange} required /> 
            <input type='number' name='diagnosticTestsFee' placeholder='Diagnostic Tests Fee' value={formData.diagnosticTestsFee} onChange={handleChange} required /> 
            <input type='number' name='diagnosticScanFee' placeholder='Diagnostic Scan Fee' value={formData.diagnosticScanFee} onChange={handleChange} required /> 
            <input type='number' name='medicationFee' placeholder='Medication Fee' value={formData.medicationFee} onChange={handleChange} required /> 
            <button type='submit'>Create Invoice</button>
        </form>
        {message && <p>{message}</p>}
        {<GetAllPatients/>}
        {<PatientInvoiceById/>}
    </div>
  )
}

export default CreateInvoice