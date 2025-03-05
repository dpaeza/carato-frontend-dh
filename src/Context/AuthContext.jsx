import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        // Verificar si hay un usuario en localStorage al cargar la app
        const storedUser = JSON.parse(localStorage.getItem('auth'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false); // Finaliza la carga una vez se haya realizado la verificación
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
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
