import React, { useState } from "react";
import axios from "axios";
import "./PatientInvoiceById.css";

function PatientInvoiceById() {
  const [patientId, setPatientId] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const getInvoicesById = async (e) => {
    e.preventDefault();
    setMessage("");
    setInvoices([]);

    try {
      const result = await axios.get(`http://localhost:8080/api/get-invoice/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(result.data);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
    <div className="patient-invoice-page">
      <h2>Get Invoices by Patient ID</h2>

      <form className="invoice-form-container" onSubmit={getInvoicesById}>
        <input type="number" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required/>
        <button type="submit">Fetch Invoices</button>
      </form>

      {message && <p>{message}</p>}

      {invoices.length > 0 ? (
        <div className="invoice-grid">
          {invoices.map((invoice, index) => (
            <div key={index} className="invoice-card">
              <div className="invoice-header">
                <h3>Invoice #{invoice.invoiceId}</h3>
                <span className={`invoice-status ${invoice.status === "PAID" ? "paid" : "unpaid"}`}>
                  {invoice.status}
                </span>
              </div>
              <div className="invoice-details">
                <span>Patient:</span>
                <p>{invoice.patientName}</p>
                <span>Provider:</span>
                <p>{invoice.providerName}</p>
                <span>Consultation Fee:</span>
                <p>₹{invoice.consultationFee}</p>
                <span>Scan Fee:</span>
                <p>₹{invoice.diagnosticScanFee}</p>
                <span>Tests Fee:</span>
                <p>₹{invoice.diagnosticTestsFee}</p>
                <span>Medication Fee:</span>
                <p>₹{invoice.medicationFee}</p>
                <span>Subtotal:</span>
                <p>₹{invoice.subtotal}</p>
                <span>Tax:</span>
                <p>₹{invoice.tax}</p>
                <span>Total Amount:</span>
                <p><strong>₹{invoice.totalAmount}</strong></p>
                <span>Invoice Date:</span>
                <p>{invoice.invoiceDate}</p>
                <span>Due Date:</span>
                <p>{invoice.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-invoice-text">No invoices found.</p>
      )}
    </div>
  );
}

export default PatientInvoiceById;
