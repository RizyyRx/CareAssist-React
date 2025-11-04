import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Get Invoices by Patient ID</h2>

      <form onSubmit={getInvoicesById}>
        <input type="number" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required/>
        <button type="submit">Fetch Invoices</button>
      </form>

      {message && <p>{message}</p>}

      {invoices.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Number</th>
              <th>Consultation Fee</th>
              <th>Diagnostic Scan Fee</th>
              <th>Diagnostic Tests Fee</th>
              <th>Medication Fee</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Patient ID</th>
              <th>Provider ID</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.consultationFee}</td>
                <td>{invoice.diagnosticScanFee}</td>
                <td>{invoice.diagnosticTestsFee}</td>
                <td>{invoice.medicationFee}</td>
                <td>{invoice.subtotal}</td>
                <td>{invoice.tax}</td>
                <td>{invoice.totalAmount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.invoiceDate}</td>
                <td>{invoice.dueDate}</td>
                <td>{invoice.patientId}</td>
                <td>{invoice.providerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
}

export default PatientInvoiceById;
