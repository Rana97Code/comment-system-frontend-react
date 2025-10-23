import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import ContentAdd from './components/ContentAdd';
import ContentList from './pages/ContentList';
import AdminAuthorize from './pages/AdminAuthorize';
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
<Route path="/content/add" element={<ContentAdd />} />
<Route path="/content/list" element={<ContentList />} />
<Route path="/admin/authorize" element={<AdminAuthorize />} />
</Routes>
</main>
</div>
);
}