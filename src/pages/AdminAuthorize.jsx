import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/fetcher";
import "../styles/adminAuthorize.scss";

export default function AdminAuthorize() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.role === "admin") fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = async (userId) => {
    try {
      const res = await api.post(
        "/auth/authorize",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      fetchUsers();
    } catch (err) {
      setMessage("Failed to authorize user");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.post(
        "/auth/update-role",
        { userId, role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      fetchUsers();
    } catch (err) {
      setMessage("Failed to update role");
    }
  };

  if (!user || user.role !== "admin") {
    return <p className="no-access">Access denied — Admins only.</p>;
  }

  if (loading) return <p className="loading">Loading users...</p>;

  return (
    <div className="admin-authorize-page">
      <h1>User Management</h1>
      {message && <p className="alert">{message}</p>}

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Authorized</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td>{u.username || "N/A"}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`status ${
                      u.isAuthorized ? "authorized" : "pending"
                    }`}
                  >
                    {u.isAuthorized ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="audience">Audience</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleAuthorize(u._id)}
                    className={`authorize-btn ${
                      u.isAuthorized ? "deauthorize" : ""
                    }`}
                  >
                    {u.isAuthorized ? "Deauthorize" : "Authorize"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
