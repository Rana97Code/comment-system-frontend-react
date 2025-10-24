import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProfilePage.scss'; 

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <div className="profile-container">Please login.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="user-name">{user.name}</h2>
        <p className="user-role">{user.role}</p>
        <div className="user-info">
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="label">ID:</span>
            <span className="value">{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
