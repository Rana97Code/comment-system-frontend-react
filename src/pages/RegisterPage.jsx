import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/RegisterPage.scss';


const RegisterPage = () => {
const { register } = useAuth();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setLoading(true);
try {
await register({ name, email, password });
navigate('/login');
} catch (err) {
setError('Registration failed. Please try again.');
} finally {
setLoading(false);
}
};
return (
    <div className="register-container">
    <div className="register-card">
    <h2 className="register-title">Create Account 🚀</h2>
    <p className="register-subtitle">Join us and share your thoughts!</p>
    <form onSubmit={handleSubmit} className="register-form">
    <div className="form-group">
    <label htmlFor="name">Full Name</label>
    <input
    id="name"
    type="text"
    placeholder="Enter your full name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    />
    </div>
    <div className="form-group">
    <label htmlFor="email">Email Address</label>
    <input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
    id="password"
    type="password"
    placeholder="Create a strong password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    />
    </div>
    {error && <div className="error-message">{error}</div>}
    <button type="submit" className="register-button" disabled={loading}>
    {loading ? 'Registering...' : 'Sign Up'}
    </button>
    <div className="register-footer">
    <p>
    Already have an account? <Link to="/login">Login</Link>
    </p>
    </div>
    </form>
    </div>
    </div>
    );
    };
    
    
    export default RegisterPage;