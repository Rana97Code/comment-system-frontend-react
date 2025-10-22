import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/fetcher';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
// attempt to fetch current user on load
(async () => {
try {
const res = await api.get(`${process.env.REACT_APP_API_URL}/auth/me`);
setUser(res.data.user);
} catch (err) {
setUser(null);
} finally { setLoading(false); }
})();
}, []);


const login = async (credentials) => {
const res = await api.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
const token = res.data.token;
localStorage.setItem('token', token);
// fetch user
const me = await api.get(`${process.env.REACT_APP_API_URL}/auth/me`);
setUser(me.data.user);
};

const register = async ({ name, email, password }) => {
const res = await api.post(`${process.env.REACT_APP_API_URL}/auth/register`, { name, email, password });
    return res.data;
 };

const logout = async () => {
localStorage.removeItem('token');
setUser(null);
try { await api.post(`${process.env.REACT_APP_API_URL}/auth/logout`); } catch (e) {}
};


return (
<AuthContext.Provider value={{ user, loading, login,register, logout }}>
{children}
</AuthContext.Provider>
);
};


export const useAuth = () => useContext(AuthContext);