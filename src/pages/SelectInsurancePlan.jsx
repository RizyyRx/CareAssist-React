import React, { useState } from "react";
import axios from "axios";
import GetInsurancePlans from "../components/GetInsurancePlans";
import SelectedPlans from "../components/SelectedPlans";
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
        setMessage(error.response.data || "Failed to select plan");
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

      {message && <p>{message}</p>}

      <SelectedPlans refresh={refreshTrigger} />
      <GetInsurancePlans refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default SelectInsurancePlan;
