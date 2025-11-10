import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ICProfile.css';
import { useLocation } from 'react-router-dom';

function ICProfile() {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    contactNumber: '',
    description: '',
    profilePic: ''
  });

  const [message, setMessage] = useState('');
  const [originalData, setOriginalData] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const location = useLocation();

  const token = localStorage.getItem('token');
  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/insurance-company/profile', { headers: { Authorization: `Bearer ${token}` } });
        setFormData(result.data);
        setOriginalData(result.data);
        if (result.data.profilePic) setPreview(`http://localhost:8080${result.data.profilePic}`);
      } catch (error) {
        setMessage(error.response ? error.response.data : 'Unable to fetch profile data.');
      }
    };
    fetchProfile();
  }, [location.pathname, token]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/insurance-company/update', formData, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Profile updated successfully');
      setOriginalData(formData);
    } catch (error) {
      const data = error.response?.data;
      if (typeof data === 'object') setMessage(Object.values(data).join(', '));
      else setMessage(data || 'Server not reachable');
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return setMessage('Please select a file first');
    const formDataObj = new FormData();
    formDataObj.append('file', file);
    try {
      const result = await axios.post('http://localhost:8080/api/insurance-company/upload-pic', formDataObj, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
      setMessage('Profile picture uploaded successfully');
      setFormData({ ...formData, profilePic: result.data });
    } catch (error) {
      setMessage(error.response ? error.response.data : 'Error uploading picture');
    }
  };

  return (
    <div className="update-profile-page">
      <div className="update-profile-container">
        <h1>Insurance Company Profile</h1>

        <div className="profile-pic-section">
          <div className="pic-preview">{preview ? <img src={preview} alt="Profile" /> : <div className="no-pic">No Profile Picture</div>}</div>
          <form className="upload-form" onSubmit={handleUpload}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
        </div>

        <form className="update-profile-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-column">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" id="companyName" name="companyName" placeholder="Enter company name" value={formData.companyName} onChange={handleChange} required />
              <label htmlFor="contactNumber">Contact Number</label>
              <input type="number" id="contactNumber" name="contactNumber" placeholder="Enter contact number" value={formData.contactNumber} onChange={handleChange} required />
            </div>

            <div className="form-column">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} required />
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" placeholder="Enter company description" value={formData.description} onChange={handleChange} rows="4" />
            </div>
          </div>

          <button type="submit" disabled={!isFormChanged}>Save Changes</button>
        </form>

        {message && <p className="update-message">{message}</p>}
      </div>
    </div>
  );
}

export default ICProfile;
