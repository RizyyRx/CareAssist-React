import React, { useState } from "react";
import axios from "axios";
import AllPayments from "../components/AllPayments";

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
    <div>
      <h2>Process Claim Payment</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="claimId" value={formData.claimId} placeholder="Claim ID" onChange={handleChange} required/>
        <input type="number" name="amountPaid" value={formData.amountPaid} placeholder="Enter Amount" onChange={handleChange} required/>
        <button type="submit">Process Payment</button>
      </form>
      {message && <p>{message}</p>}
      {<AllPayments  refresh={refreshTrigger}/>}
    </div>
  );
}

export default ProcessPayment;
