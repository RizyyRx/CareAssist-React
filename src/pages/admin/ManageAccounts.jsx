import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageAccounts.css";

function ManageAccounts() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
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
                  <button onClick={() => handleDelete(user.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !message && <p className="no-users-text">No users found.</p>
      )}
    </div>
  );
}

export default ManageAccounts;
