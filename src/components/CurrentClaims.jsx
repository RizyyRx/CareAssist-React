import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CurrentClaims({ refresh }) {
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/patient/claims', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClaims(response.data);
        setMessage(response.data.length === 0 ? 'No claims found' : '');
      } catch (error) {
        if (error.response) setMessage(error.response.data.message || JSON.stringify(error.response.data));
        else setMessage('Server not reachable');
      }
    };
    fetchClaims();
  }, [refresh]);

      const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div>
      <h1>Current Claims</h1>
      {message && <p>{message}</p>}
      {claims.length > 0 && (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Claim ID</th><th>Claim Amount</th><th>Invoice Amount</th><th>Date of Service</th><th>Diagnosis</th><th>Treatment</th><th>Status</th><th>Submitted At</th><th>Reviewed At</th><th>Approved At</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.claimId}>
                <td>{claim.claimId}</td>
                <td>{claim.claimAmount}</td>
                <td>{claim.invoiceAmount}</td>
                <td>{claim.dateOfService}</td>
                <td>{claim.diagnosis}</td>
                <td>{claim.treatment}</td>
                <td>{claim.status}</td>
                <td>{formatDateTime(claim.submittedAt) || '-'}</td>
                <td>{formatDateTime(claim.reviewedAt) || '-'}</td>
                <td>{formatDateTime(claim.approvedAt) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CurrentClaims;
