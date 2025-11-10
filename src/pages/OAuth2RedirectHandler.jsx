import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../components/AuthContext';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Save token
      localStorage.setItem('token', token);

      // Decode token and log key info
      const decoded = jwtDecode(token);
      const username = decoded.name || decoded.email;
      const role = decoded.role || 'ROLE_PATIENT';

      console.log("🔐 OAuth Token:", token);
      console.log("👤 Username:", username);
      console.log("🧩 Role:", role);

      // Update user context
      setUser({ username, role });

      // Navigate by role
      if (role === 'ROLE_PATIENT') navigate('/patient/patient-home');
      else if (role === 'ROLE_HEALTHCARE_PROVIDER') navigate('/hp/hp-home');
      else if (role === 'ROLE_INSURANCE_COMPANY') navigate('/ic/ic-home');
      else if (role === 'ROLE_ADMIN') navigate('/admin/admin-home');
      else navigate('/dashboard');

    } else {
      console.log("⚠️ No token found in redirect URL");
      navigate('/login');
    }
  }, [navigate, setUser]);

  return (
    <div style={{ textAlign: 'center', marginTop: '120px', color: '#5a4fcf' }}>
      <h2>Logging you in with Google...</h2>
      <p>Please wait a moment.</p>
    </div>
  );
}

export default OAuth2RedirectHandler;
