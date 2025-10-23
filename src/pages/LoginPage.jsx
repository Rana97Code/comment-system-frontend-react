import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.scss';


const LoginPage = () => {
const { login } = useAuth();
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
await login({email, password});
navigate('/');
} catch (err) {
setError('Invalid email or password');
} finally {
setLoading(false);
}
};


return (
<div className="login-container">
<div className="login-card">
<h2 className="login-title">Welcome Back 👋</h2>
<p className="login-subtitle">Please log in to continue</p>
<form onSubmit={handleSubmit} className="login-form">
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
placeholder="Enter your password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
{error && <div className="error-message">{error}</div>}
<button type="submit" className="login-button" disabled={loading}>
{loading ? 'Logging in...' : 'Login'}
</button>
<div className="login-footer">
<Link to="/register" className="register-link">I don't have any account</Link>
</div>
</form>
</div>
</div>
);
};


export default LoginPage;