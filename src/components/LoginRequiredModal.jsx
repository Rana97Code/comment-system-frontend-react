import React from 'react';
import { Link } from 'react-router-dom'; 

export default function LoginRequiredModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Login Required</h3>
        <p className="modal-message">You must be logged in to perform this action.</p>
        <Link to="/login" className="login-link">Go to Login</Link>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}
