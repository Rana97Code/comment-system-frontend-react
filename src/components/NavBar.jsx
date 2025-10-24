import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        {/* Left side links */}
        <div className="nav-left">
          <Link to="/" className="logo">
            Home
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/admin/authorize">Authorize Users</Link>
              <Link to="/content/add">Add Page</Link>
              <Link to="/content/list">Page List</Link>
            </>
          )}
        </div>

        {/* Right side login/profile section */}
        <div className="nav-right">
          {user ? (
            <>
              <Link to="/profile" className="profile-name">
                {user.name}
              </Link>
              <button onClick={logout} className="btn-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
