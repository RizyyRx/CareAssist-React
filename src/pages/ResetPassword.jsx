import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';
import HomeNav from '../components/HomeNav';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
        setMessage("Passwords don't match");
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
            token: token,
            newPassword: newPassword,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
        );
        setMessage(response.data);
        setTimeout(() => navigate('/login'), 2500); // Redirect after success
    } catch (error) {
        if (error.response) setMessage(error.response.data);
        else setMessage('Server not reachable.');
    } finally {
        setLoading(false);
    }
    };


  return (
    <div>
      <HomeNav />
      <div className="reset-page">
        <div className="reset-container">
          <h1>Reset Password</h1>
          <p>Enter and confirm your new password below.</p>
          <form onSubmit={handleSubmit} className="reset-form">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          {message && <p className="reset-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
