import React, { useEffect, useState } from "react";
import axios from "axios";
import './CurrentPayments.css'

function CurrentPayments() {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/patient/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(result.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching payments:", error);
      if (error.response) {
        setMessage(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
<div className="payments-page">
  <h2>My Payments</h2>
  {message && <p>{message}</p>}

  {payments.length > 0 ? (
    <div className="payments-grid">
      {payments.map((p) => (
        <div key={p.paymentId} className="payment-card">
          <h3>Payment #{p.paymentId}</h3>
          <div className="payment-details">
            <span>Claim ID:</span><p>{p.claimId}</p>
            <span>Insurance Company ID:</span><p>{p.insuranceCompanyId}</p>
            <span>Patient ID:</span><p>{p.patientId}</p>
            <span>Amount Paid:</span><p>₹{p.amountPaid}</p>
            <span>Payment Date:</span><p>{p.paymentDate}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    !message && <p className="no-payments-text">No payments found.</p>
  )}
</div>

  );
}

export default CurrentPayments;
