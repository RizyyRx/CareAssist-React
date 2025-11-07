import React, { useEffect, useState } from "react";
import axios from "axios";

function SelectedPlans({ refresh }) {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchSelectedPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/patient/selected-plans",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedPlans(response.data);
      setMessage("");
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data || "Failed to load selected plans"
        );
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  useEffect(() => {
    fetchSelectedPlans();
  }, [refresh]);

  return (
    <div>
      <h2>Selected Insurance Plan</h2>
      {message && <p>{message}</p>}

      {selectedPlans.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Coverage</th>
              <th>Premium</th>
              <th>Coverage Balance</th>
              <th>Term</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {selectedPlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planName}</td>
                <td>{plan.coverageAmount}</td>
                <td>{plan.premiumAmount}</td>
                <td>{plan.coverageBalance}</td>
                <td>{plan.policyTerm}</td>
                <td>{plan.description}</td>
                <td>{plan.startDate}</td>
                <td>{plan.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p>No plans selected yet.</p>
      )}
    </div>
  );
}

export default SelectedPlans;
