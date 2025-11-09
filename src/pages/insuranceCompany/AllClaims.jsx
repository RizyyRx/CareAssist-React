import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectedPlans from "../../components/patient/SelectedPlans";
import "./AllClaims.css";
import { useAuth } from "../../components/AuthContext";

function AllClaims() {
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const fetchClaims = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get-claims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaims(response.data);
    } catch (error) {
      console.error("Error fetching claims:", error);
      setMessage("Failed to fetch claims");
    }
  };

    useEffect(() => {
    fetchClaims();
    }, []);

  const handleApprove = async (claimId) => {
    try {
      await axios.patch(`http://localhost:8080/api/insurance-company/claim/approve/${claimId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Claim ${claimId} approved successfully`);
      fetchClaims();
    } catch (error) {
      console.error("Error approving claim:", error);
      alert("Failed to approve claim");
    }
  };

    const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="all-claims-container">
      <h2>All Claims</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr><th>Claim ID</th><th>Claim Amount</th><th>Invoice Amount</th><th>Date of Service</th><th>Diagnosis</th><th>Treatment</th><th>Status</th><th>Submitted At</th><th>Reviewed At</th><th>Approved At</th>{!isAdmin && <th>Action</th>}</tr>
        </thead>
        <tbody>
          {claims.length > 0 ? (
            claims.map((claim) => (
              <tr key={claim.claimId}>
                <td>{claim.claimId}</td>
                <td>{claim.claimAmount}</td>
                <td>{claim.invoiceAmount}</td>
                <td>{claim.dateOfService}</td>
                <td>{claim.diagnosis}</td>
                <td>{claim.treatment}</td>
                <td>{claim.status}</td>
                <td>{formatDateTime(claim.submittedAt)}</td>
                <td>{formatDateTime(claim.reviewedAt)}</td>
                <td>{formatDateTime(claim.approvedAt)}</td>
                {!isAdmin && (
                  <td>
                    {claim.status !== "APPROVED" ? (
                      <button onClick={() => handleApprove(claim.claimId)}>Review & Approve Claim</button>
                    ) : "Approved"}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr><td colSpan="11">No claims found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllClaims;
