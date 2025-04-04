import api from "./api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/reviews";

export const getReviews = async (carId) =>
{
    try {
        const response = await api.get(API_URL, {
            params: { carId }
        });
        return response.data
    } catch (error) {
        console.error("Error al obtener las reseñas:", error);
        throw error;
    }
}

export const addReview = async (reviewData) => {
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
            reviewData,
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error("Error al agregar reseña:", error);
        throw error;
    }
}