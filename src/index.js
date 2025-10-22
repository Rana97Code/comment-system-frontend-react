import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CommentsProvider } from './contexts/CommentsContext';
import './styles/main.scss';


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<AuthProvider>
<CommentsProvider>
<App />
</CommentsProvider>
</AuthProvider>
</BrowserRouter>
</React.StrictMode>
);