import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si hay un usuario en localStorage al cargar la app
        const storedUser = JSON.parse(localStorage.getItem('auth'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('auth', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);