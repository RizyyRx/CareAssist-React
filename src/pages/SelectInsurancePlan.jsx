import React, { useEffect, useState } from "react";
import axios from "axios";
import GetInsurancePlans from "../components/GetInsurancePlans";

function SelectInsurancePlan() {
  const token = localStorage.getItem("token");
  const [planId, setPlanId] = useState("");
  const [message, setMessage] = useState("");

  const [selectedPlans, setSelectedPlans] = useState([]);
  const [fetchSelectedMsg, setFetchSelectedMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/patient/select-plan",{ planId: planId },{headers: { Authorization: `Bearer ${token}`},});
      setMessage(response.data);
      fetchSelectedPlans();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || "failed to select plan");
      } else {
        setMessage("Server not reachable");
      }
    }
  };

   const fetchSelectedPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/patient/selected-plans",{ headers: { Authorization: `Bearer ${token}`}});
      setSelectedPlans(response.data);
      setFetchSelectedMsg("");
    } catch (error) {
      if (error.response) {
        setFetchSelectedMsg(error.response.data || "Failed to load selected plans");
      } else {
        setFetchSelectedMsg("Server not reachable");
      }
    }
  };

  useEffect(() => {
    fetchSelectedPlans();
  }, []);

  return (
    <div>
      <h1>Select Insurance Plan</h1>

      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Enter Plan ID" value={planId} onChange={(e) => setPlanId(e.target.value)} required/>
        <button type="submit">Select Plan</button>
      </form>

      {message && <p>{message}</p>}

      {<GetInsurancePlans/>}

      <h2>Selected Insurance Plans</h2>
      {selectedPlans.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Term</th>
              <th>Description</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {selectedPlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planName}</td>
                <td>{plan.coverageAmount}</td>
                <td>{plan.premiumAmount}</td>
                <td>{plan.policyTerm}</td>
                <td>{plan.description}</td>
                <td>{plan.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{fetchSelectedMsg || "No plans selected yet."}</p>
      )}
    </div>
  );
}

export default SelectInsurancePlan;
