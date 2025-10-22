import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';

export default function App(){
return (
<div className="app-root">
<NavBar />
<main className="container">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/profile" element={<ProfilePage />} />
</Routes>
</main>
</div>
);
}