import React, { useEffect, useState } from "react";
import axios from "axios";

function CurrentPayments() {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/patient/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(result.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching payments:", error);
      if (error.response) {
        setMessage(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      <h2>My Payments</h2>
      {message && <p>{message}</p>}
      {payments.length > 0 ? (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Claim ID</th>
              <th>Insurance Company ID</th>
              <th>Patient ID</th>
              <th>Amount Paid</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.paymentId}>
                <td>{p.paymentId}</td>
                <td>{p.claimId}</td>
                <td>{p.insuranceCompanyId}</td>
                <td>{p.patientId}</td>
                <td>{p.amountPaid}</td>
                <td>{p.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p>No payments found.</p>
      )}
    </div>
  );
}

export default CurrentPayments;
