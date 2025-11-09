import React from 'react'
import { useAuth } from '../../components/AuthContext';
import AllClaims from '../insuranceCompany/AllClaims';
import AllPayments from '../../components/insuranceCompany/AllPayments';
import './AdminHome.css';

function AdminHome() {
  const { user } = useAuth();

  return (
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>
      <AllClaims />
      <div className="payments-section">
        <AllPayments />
      </div>
    </div>
  );
}

export default AdminHome;
