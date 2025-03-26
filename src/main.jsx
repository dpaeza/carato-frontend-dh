import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  AuthProvider from './Context/auth.context.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        secondary: {
            main: '#2db742',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
);