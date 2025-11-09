import React, { useEffect, useState } from "react";
import axios from "axios";
import './CurrentInvoices.css'

function CurrentInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const getInvoices = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/patient/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(result.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching invoices:", error);
      if (error.response) {
        setMessage(error.response.data || "Failed to load invoices.");
      } else {
        setMessage("Server not reachable.");
      }
    }
  };

  const markAsPaid = async (invoiceId) => {
    try {
      const result = await axios.patch(
        `http://localhost:8080/api/patient/invoice/mark-paid/${invoiceId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(result.data);
      getInvoices();
    } catch (error) {
      console.error("Error marking invoice paid:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to mark as paid.");
      } else {
        alert("Server not reachable.");
      }
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="invoice-page">
      <h2>My Current Invoices</h2>

      {message && <p>{message}</p>}

      {invoices.length === 0 && !message ? (
        <p className="no-invoice-text">No invoices available.</p>
      ) : (
        <div className="invoice-grid">
          {invoices.map((inv) => (
            <div key={inv.invoiceId} className="invoice-card">
              <div className="invoice-header">
                <h3>Invoice #{inv.invoiceId}</h3>
                <span
                  className={`invoice-status ${
                    inv.status === "PAID" ? "paid" : "unpaid"
                  }`}
                >
                  {inv.status}
                </span>
              </div>

              <div className="invoice-details">
                <span>Patient:</span>
                <p>{inv.patientName}</p>
                <span>Provider:</span>
                <p>{inv.providerName}</p>
                <span>Consultation Fee:</span>
                <p>₹{inv.consultationFee}</p>
                <span>Scan Fee:</span>
                <p>₹{inv.diagnosticScanFee}</p>
                <span>Tests Fee:</span>
                <p>₹{inv.diagnosticTestsFee}</p>
                <span>Medication Fee:</span>
                <p>₹{inv.medicationFee}</p>
                <span>Subtotal:</span>
                <p>₹{inv.subtotal}</p>
                <span>Tax:</span>
                <p>₹{inv.tax}</p>
                <span>Total Amount:</span>
                <p>
                  <strong>₹{inv.totalAmount}</strong>
                </p>
                <span>Invoice Date:</span>
                <p>{inv.invoiceDate}</p>
                <span>Due Date:</span>
                <p>{inv.dueDate}</p>
              </div>
                <div className="invoice-actions">
                  {inv.status !== "PAID" && (
                    <button onClick={() => markAsPaid(inv.invoiceId)}>PAY</button>
                  )}
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentInvoices;
