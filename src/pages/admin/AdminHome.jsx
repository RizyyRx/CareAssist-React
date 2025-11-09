import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/AuthContext';
import AllClaims from '../insuranceCompany/AllClaims';
import AllPayments from '../../components/insuranceCompany/AllPayments';
import './AdminHome.css';
import axios from "axios";

function AdminHome() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user?.username) return; 
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/get-username/${user.username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDisplayName(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
        setDisplayName(user.username); 
      }
    };

    fetchUsername();
  }, [user, token]);

  return (
    <div className="admin-home-container">
      <h1>Admin Dashboard{displayName ? ` for ${displayName}` : ""}</h1>
      <AllClaims />
      <div className="payments-section">
        <AllPayments />
      </div>
    </div>
  );
}

export default AdminHome;
