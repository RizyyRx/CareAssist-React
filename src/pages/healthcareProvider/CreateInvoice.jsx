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

    const [pdfPatientId, setPdfPatientId] = useState("");
    const [pdfFile, setPdfFile] = useState(null);

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

  // handle pdf file selection
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file || null);
  };

  const handlePdfPatientIdChange = (e) => {
    setPdfPatientId(e.target.value);
  };

  // create invoice from pdf
  const handlePdfSubmit = async (e) => {
    e.preventDefault();

    if (!pdfPatientId) {
      setMessage("Please enter Patient ID for PDF invoice");
      return;
    }
    if (!pdfFile) {
      setMessage("Please select a PDF file");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pdfFile);
      data.append("patientId", pdfPatientId);

      const result = await axios.post("http://localhost:8080/api/provider/create-invoice-from-pdf", data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(result.data || "Invoice created successfully from PDF!");
    } catch (error) {
      if (error.response) setMessage(error.response.data || "Failed to create invoice from PDF");
      else setMessage("Server not reachable");
    }
  };

  return (
    <div className='create-invoice-page'>
        <h2>Create Invoice</h2>
        <div className='form-container'>
          <div className='manual-form-wrapper'>
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
          </form>
          </div>

          <div className='pdf-form-wrapper'>
            <form className='invoice-form' onSubmit={handlePdfSubmit}>
              <h3 style={{ color: 'rgb(223, 226, 253)', textAlign: 'center', marginBottom: '10px' }}>Create Invoice From PDF</h3>
              <label htmlFor='pdfPatientId'>Patient ID</label>
              <input type='number' id='pdfPatientId' name='pdfPatientId' placeholder='Patient ID' value={pdfPatientId} onChange={handlePdfPatientIdChange} required />
              <label htmlFor='invoicePdf'>Upload Invoice PDF</label>
              <input type='file' id='invoicePdf' accept='application/pdf' onChange={handlePdfChange} required />
              <button type='submit'>Create Invoice From PDF</button>
            </form>
          </div>
        </div>
        {message && <p>{message}</p>}
        <div className='current-claims-section'>
          <GetAllPatients/>
          <PatientInvoiceById/>
        </div>
    </div>
  )
}

export default CreateInvoice