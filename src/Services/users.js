import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL+ '/users';

export const getUsers = async (page = 1, size = 10) => {
    try {
        const userData = JSON.parse(localStorage.getItem('auth'));
        const token = userData ? userData.token : null;
    
        const headers = {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
        };
    
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        console.log(token)
        const response = await axios.get(API_URL, {
            params: { page, size },
            headers: headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

export const updateRole = async (id, role) => {
    try {
        const userData = JSON.parse(localStorage.getItem('auth'));
        const token = userData ? userData.token : null;
    
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
    
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        console.log(token)
        const response = await axios.patch(
            `${API_URL}/${id}/role`,
            { role },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}