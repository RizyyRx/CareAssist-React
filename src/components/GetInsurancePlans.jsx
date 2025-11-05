import React, { useEffect, useState }  from 'react'
import axios from 'axios';

function GetInsurancePlans({refreshTrigger}) {

    const token = localStorage.getItem("token")

    const [plans, setPlans] = useState([]);
    const [fetchMessage, setFetchMessage] = useState("");

    const getAllPlans = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8080/api/insurance-company/get-all",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPlans(result.data);
      } catch (error) {
        if (error.response) {
          setFetchMessage(error.response.data.message || JSON.stringify(error.response.data));
        } else {
          setFetchMessage("Server not reachable");
        }
      }
    };

    useEffect(() => {
      getAllPlans();
    }, [refreshTrigger]);
  return (
    <div>
        <h2>Available Insurance Plans</h2>
        {plans.length > 0 ? (
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
                <tr>
                    <th>Plan ID</th>
                    <th>Plan Name</th>
                    <th>Coverage</th>
                    <th>Premium</th>
                    <th>Term</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {plans.map((plan) => (
                <tr key={plan.planId}>
                    <td>{plan.planId}</td>
                    <td>{plan.planName}</td>
                    <td>{plan.coverageAmount}</td>
                    <td>{plan.premiumAmount}</td>
                    <td>{plan.policyTerm}</td>
                    <td>{plan.description}</td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p>No plans available</p>
        )}
        {fetchMessage && <p>{fetchMessage}</p>}
    </div>
  )
}

export default GetInsurancePlans