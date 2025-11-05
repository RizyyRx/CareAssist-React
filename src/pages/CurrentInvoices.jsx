import React, { useEffect, useState } from "react";
import axios from "axios";

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
        setMessage(error.response.data.message || "Failed to load invoices.");
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
      getInvoices(); // refresh the list
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
    <div className="invoice-container" style={{ padding: "20px" }}>
      <h2>My Current Invoices</h2>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {invoices.length === 0 && !message ? (
        <p>No invoices available.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Provider</th>
              <th>Consultation Fee</th>
              <th>Scan Fee</th>
              <th>Tests Fee</th>
              <th>Medication Fee</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceId}>
                <td>{inv.invoiceId}</td>
                <td>{inv.patientName}</td>
                <td>{inv.providerName}</td>
                <td>₹{inv.consultationFee}</td>
                <td>₹{inv.diagnosticScanFee}</td>
                <td>₹{inv.diagnosticTestsFee}</td>
                <td>₹{inv.medicationFee}</td>
                <td>₹{inv.subtotal}</td>
                <td>₹{inv.tax}</td>
                <td><strong>₹{inv.totalAmount}</strong></td>
                <td>{inv.status}</td>
                <td>{inv.invoiceDate}</td>
                <td>{inv.dueDate}</td>
                <td>
                  {inv.status !== "PAID" ? (<button onClick={() => markAsPaid(inv.invoiceId)}>PAY</button>) : (<span>Paid</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CurrentInvoices;
