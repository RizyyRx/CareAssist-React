import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import HomeNav from '../components/HomeNav';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setMessage(response.data);
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
      <div className="forgot-page">
        <div className="forgot-container">
          <h1>Forgot Password?</h1>
          <p>Enter your registered email to receive a password reset link.</p>
          <form onSubmit={handleSubmit} className="forgot-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          {message && <p className="forgot-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
