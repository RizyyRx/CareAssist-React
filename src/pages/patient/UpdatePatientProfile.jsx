import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UpdatePatientProfile.css';

function UpdatePatientProfile() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', contactNumber: '', address: '', medicalHistory: '', profilePic: ''
  });

  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [originalData, setOriginalData] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => { const selectedFile = e.target.files[0]; if (selectedFile) { setFile(selectedFile); setPreview(URL.createObjectURL(selectedFile)); } };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/patient/profile', { headers: { Authorization: `Bearer ${token}` } });
        setFormData(res.data); setOriginalData(res.data); if (res.data.profilePic) setPreview(`http://localhost:8080${res.data.profilePic}`);
      } catch (err) {
        setMessage(err.response ? err.response.data : 'Unable to fetch profile data.');
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => { if (message) { const timer = setTimeout(() => setMessage(''), 5000); return () => clearTimeout(timer); } }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:8080/api/patient/update-profile', formData, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data); setOriginalData(formData);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'object') setMessage(Object.values(data).join(', '));
      else setMessage(data || 'Server not reachable');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file first');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post('http://localhost:8080/api/patient/upload-pic', fd, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
      setMessage('Profile picture uploaded successfully');
      setFormData({ ...formData, profilePic: res.data });
    } catch (err) {
      setMessage(err.response ? err.response.data : 'Error uploading picture');
    }
  };

  return (
    <div className="update-profile-page">
      <div className="update-profile-container">
        <h1>Update Patient Profile</h1>

        <div className="profile-pic-section">
          <div className="pic-preview">{preview ? <img src={preview} alt="Profile" /> : <div className="no-pic">No Profile Picture</div>}</div>
          <form className="upload-form" onSubmit={handleUpload}>
            <input type="file" accept="image/*" onChange={handleFileChange} /> <button type="submit">Upload</button>
          </form>
        </div>

        <form className="update-profile-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} required /> 
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} required /> 
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required /> 
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="preferNotToSay">Prefer not to say</option>
          </select> 
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="number" id="contactNumber" name="contactNumber" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange} required /> 
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} required /> 
          <label htmlFor="medicalHistory">Medical History</label>
          <input type="text" id="medicalHistory" name="medicalHistory" placeholder="Enter medical history" value={formData.medicalHistory} onChange={handleChange} /> 
          <button type="submit" disabled={!isFormChanged}>Save Changes</button>
        </form>

        {message && <p className="update-message">{message}</p>}
      </div>
    </div>
  );
}

export default UpdatePatientProfile;
