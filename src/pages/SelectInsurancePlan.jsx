import React, { useState } from "react";
import axios from "axios";
import GetInsurancePlans from "../components/GetInsurancePlans";
import SelectedPlans from "../components/SelectedPlans";

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
    <div>
      <h1>Select Insurance Plan</h1>

      <form onSubmit={handleSubmit}>
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

      <GetInsurancePlans />

      <SelectedPlans refresh={refreshTrigger} />
    </div>
  );
}

export default SelectInsurancePlan;
