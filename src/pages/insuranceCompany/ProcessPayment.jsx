import React, { useState } from "react";
import axios from "axios";
import AllPayments from "../../components/insuranceCompany/AllPayments";
import './ProcessPayment.css';

function ProcessPayment() {
  const [formData, setFormData] = useState({
    claimId: "",
    amountPaid: ""
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [refreshTrigger, setRefreshTrigger] = useState(false); 

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8080/api/insurance-company/claim/process-payment",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(result.data);
      setFormData({ claimId: "", amountPaid: ""});
      setRefreshTrigger(prev => !prev);
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error.response) {
        setMessage(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
    <div className="process-payment-page">
      <h2>Process Claim Payment</h2>

      <div className="process-form-container">
        <form className="process-form" onSubmit={handleSubmit}>
          <label htmlFor="claimId">Claim ID</label>
          <input type="number" id="claimId" name="claimId" value={formData.claimId} placeholder="Enter Claim ID" onChange={handleChange} required />

          <label htmlFor="amountPaid">Amount Paid</label>
          <input type="number" id="amountPaid" name="amountPaid" value={formData.amountPaid} placeholder="Enter Amount" onChange={handleChange} required />

          <button type="submit">Process Payment</button>
        </form>
      </div>

      {message && <p className="process-message">{message}</p>}

      <div className="payments-section">
        <AllPayments refresh={refreshTrigger} />
      </div>
    </div>
  );
}

export default ProcessPayment;
