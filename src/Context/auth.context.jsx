import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    const MySwal = withReactContent(Swal);

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
        MySwal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => window.location.reload());
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth');
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
