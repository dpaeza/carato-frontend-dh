import api from './api';

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const sendConfirmationEmail = async (email) => {
    try {
        const body = {
            email: email
        }
        await api.post('/auth/resend-confirmation', body );
    } catch (error) {
        console.error('Error al reenviar correo:', error);
        throw error;
    }
}