import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  AuthProvider from './Context/auth.context.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
);