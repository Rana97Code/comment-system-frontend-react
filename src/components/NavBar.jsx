import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function NavBar(){
const { user, logout } = useAuth();

return (
<nav className="nav">
<div className="nav-inner container">
<Link to="/" className="logo">Home</Link>
<div className="nav-links">
{user ? (
<>
<Link to="/profile">{user.name}</Link>
<button onClick={logout} className="btn-link">Logout</button>
</>
) : (
<Link to="/login">Login</Link>
)}
</div>
</div>
</nav>
);
}