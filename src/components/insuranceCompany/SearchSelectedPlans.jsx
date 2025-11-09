import React, { useState } from "react";
import axios from "axios";
import "./SearchSelectedPlans.css";

function SearchSelectedPlan() {
  const [patientId, setPatientId] = useState("");
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      setMessage("Please enter a valid Patient ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/get-patient-insurance/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length === 0) {
        setMessage("No insurance plans found for this patient.");
        setPlans([]);
      } else {
        setPlans(response.data);
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching selected plans:", error);
      if (error.response) {
        setMessage(
          error.response.data.message || "Failed to fetch patient plan."
        );
      } else {
        setMessage("Server not reachable.");
      }
    }
  };

  return (
    <div className="search-plan-container">
      <h2>Search Patient’s Selected Plan</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="patientId">Enter Patient ID</label>
        <input
          type="number"
          id="patientId"
          name="patientId"
          value={patientId}
          onChange={handleChange}
          placeholder="Enter Patient ID"
          required
        />
        <button type="submit">Search</button>
      </form>

      {message && <p className="message">{message}</p>}

      {plans.length > 0 && (
        <table className="plans-table">
        <thead>
            <tr>
            <th>Plan ID</th>
            <th>Plan Name</th>
            <th>Coverage Amount</th>
            <th>Premium Amount</th>
            <th>Coverage Balance</th>
            <th>Policy Term</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {plans.map((plan) => (
            <tr key={plan.planId}>
                <td>{plan.planId}</td>
                <td>{plan.planName}</td>
                <td>₹{plan.coverageAmount}</td>
                <td>₹{plan.premiumAmount}</td>
                <td>₹{plan.coverageBalance}</td>
                <td>{plan.policyTerm} months</td>
                <td>{plan.description}</td>
                <td>{plan.startDate}</td>
                <td>{plan.endDate}</td>
                <td>{plan.status}</td>
            </tr>
            ))}
        </tbody>
        </table>

      )}
    </div>
  );
}

export default SearchSelectedPlan;
