import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllUsers.css";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    fetchUsers();
  }, []);

  return (
    <div className="all-users-page">
      <h2>All Registered Users</h2>
      {message && <p className="user-message">{message}</p>}

      {users.length > 0 ? (
        <div className="users-grid">
          {users.map((user) => (
            <div className="user-card" key={user.userId}>
              <h3>{user.username}</h3>
              <div className="user-details">
                <span>Email:</span> <p>{user.email}</p>
                <span>User ID:</span> <p>{user.userId}</p>
                <span>Created At:</span> <p>{user.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !message && <p className="no-users-text">No users found.</p>
      )}
    </div>
  );
}

export default AllUsers;
