import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageAccounts.css";

function ManageAccounts() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [formError, setFormError] = useState("");                 

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/get-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(result.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response) {
        setMessage(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        setMessage("Server not reachable");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/delete-account/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.response) {
        alert(error.response.data.message || "Failed to delete account.");
      } else {
        alert("Server not reachable");
      }
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUserId(user.userId);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role
        ? user.role.replace("ROLE_", "").toUpperCase()
        : "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setFormError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.username || !formData.email || !formData.role) {
      setFormError("Username, email, and role are required.");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),
      };

      const response = await axios.patch(
        `http://localhost:8080/api/admin/update-account/${selectedUserId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data);
      closeUpdateModal();
      fetchUsers();
    } catch (error) {
      console.error("Error updating account:", error);
      if (error.response) {
        setFormError(error.response.data.message || "Failed to update account.");
      } else {
        setFormError("Server not reachable");
      }
    }
  };

  return (
    <div className="manage-accounts-container">
      <h2>Manage User Accounts</h2>
      {message && <p className="account-message">{message}</p>}

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role?.replace("ROLE_", "").replace(/_/g, " ")}</td>
                <td>{new Date(user.createdAt).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
                <td>
                  <button className="update-btn" onClick={() => openUpdateModal(user)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p className="no-users-text">No users found.</p>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeUpdateModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Update User</h3>
            {formError && <p className="error-text">{formError}</p>}
            <form onSubmit={handleUpdateSubmit} className="modal-form">
              <div className="form-group"><label>Username</label>
                <input name="username" type="text" value={formData.username} onChange={handleInputChange} required />
              </div>
              <div className="form-group"><label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group"><label>Password <span className="hint">(leave blank to keep same)</span></label>
                <input name="password" type="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="form-group"><label>Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="">Select role</option>
                  <option value="PATIENT">PATIENT</option>
                  <option value="HEALTHCARE_PROVIDER">HEALTHCARE_PROVIDER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="INSURANCE_COMPANY">INSURANCE_COMPANY</option>
                </select>
              </div>
              <div className="modal-actions"><button type="button" className="modal-cancel-btn" onClick={closeUpdateModal}>Cancel</button>
                <button type="submit" className="modal-save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManageAccounts;
