import React, { useEffect, useState } from "react";
import axios from "axios";

function GetAllPatients() {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/get-patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data || "Failed to fetch patients");
        } else {
          setMessage("Server not reachable");
        }
      }
    };

    fetchPatients();
  }, [token]);

  return (
    <div>
      <h2>All Patients</h2>
      {message && <p>{message}</p>}

      {patients.length > 0 ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Contact Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.patientId}>
                <td>{p.patientId}</td>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.dob}</td>
                <td>{p.gender}</td>
                <td>{p.contactNumber}</td>
                <td>{p.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p>No patients found.</p>
      )}
    </div>
  );
}

export default GetAllPatients;
