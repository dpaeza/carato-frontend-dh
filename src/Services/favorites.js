import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/favorites";

export const getFavorites = async ({
    page = 1,
    size = 10
}) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get( API_URL, { headers, params: { page, size } });

        return response.data;
        
    } catch (error) {
        console.error("Error al obtener favoritos:", error);
        throw error;
    }
}

export const addFavorite = async (carId) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.post(
            API_URL,
            { carId },
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error("Error al agregar favorito:", error);
        throw error;
    }
}

export const removeFavorite = async (carId) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.delete(API_URL, {
            headers,
            data: { carId },
        });

        return response.data;
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        throw error;
    }
}