import React, { useState } from 'react'
import GetAllPatients from '../../components/healthcareProvider/GetAllPatients';
import axios from "axios";
import PatientInvoiceById from '../../components/patient/PatientInvoiceById';
import './CreateInvoice.css';


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
    <div className='create-invoice-page'>
        <h2>Create Invoice</h2>
        <div className='form-container'>
          <form className='invoice-form' onSubmit={handleSubmit}>
              <label htmlFor='patientId'>Patient ID</label>
              <input type='number' id='patientId' name='patientId' placeholder='Patient ID' value={formData.patientId} onChange={handleChange} required></input>
              <label htmlFor='consultationFee'>Consultation Fee</label>
              <input type='number' id='consultationFee' name='consultationFee' placeholder='Consultation Fee' value={formData.consultationFee} onChange={handleChange} required /> 
              <label htmlFor='diagnosticTestsFee'>Diagnostic Tests Fee</label>
              <input type='number' id='diagnosticTestsFee' name='diagnosticTestsFee' placeholder='Diagnostic Tests Fee' value={formData.diagnosticTestsFee} onChange={handleChange} required /> 
              <label htmlFor='diagnosticScanFee'>Diagnostic Scan Fee</label>
              <input type='number' id='diagnosticScanFee' name='diagnosticScanFee' placeholder='Diagnostic Scan Fee' value={formData.diagnosticScanFee} onChange={handleChange} required /> 
              <label htmlFor='medicationFee'>Medication Fee</label>
              <input type='number' id='medicationFee' name='medicationFee' placeholder='Medication Fee' value={formData.medicationFee} onChange={handleChange} required /> 
              <button type='submit'>Create Invoice</button>
              {message && <p>{message}</p>}
          </form>
        </div>
        <div className='current-claims-section'>
          <GetAllPatients/>
          <PatientInvoiceById/>
        </div>
    </div>
  )
}

export default CreateInvoice