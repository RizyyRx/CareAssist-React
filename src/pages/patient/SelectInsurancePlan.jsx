import React, { useState } from "react";
import axios from "axios";
import GetInsurancePlans from '../../components/insuranceCompany/GetInsurancePlans';
import SelectedPlans from '../../components/patient/SelectedPlans';
import './SelectInsurancePlan.css'

function SelectInsurancePlan() {
  const token = localStorage.getItem("token");
  const [planId, setPlanId] = useState("");
  const [message, setMessage] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/patient/select-plan",
        { planId: planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data);
      setPlanId("");


      setRefreshTrigger(prev => !prev);
    } catch (error) {
      if (error.response) {
        // Check if backend returned an object
        if (data && typeof data === "object") {
          // Extract and join all messages cleanly
          const combined = Object.values(data).join(" | ");
          setMessage(combined);
          console.log("Extracted message:", combined);
        } 
        // If backend sent a plain string (rare case)
        else if (typeof data === "string") {
          setMessage(data);
        } 
        // Fallback for unknown cases
        else {
          setMessage("Invalid input — please check your fields.");
        }
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  return (
<div className="select-plan-page">
      <h1>Select Insurance Plan</h1>

      <form className="select-plan-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Plan ID"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          required
        />
        <button type="submit">Select Plan</button>
      </form>

      {message && (
        Array.isArray(message)
          ? message.map((msg, i) => <p key={i}>{msg}</p>)
          : <p>{message}</p>
      )}

      <SelectedPlans refresh={refreshTrigger} />
      <GetInsurancePlans refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default SelectInsurancePlan;
