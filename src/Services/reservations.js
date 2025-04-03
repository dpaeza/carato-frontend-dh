import api from "./api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ;

export const getVehicleReservations = async (id) => {
    try {
        const response = await api.get(`${API_URL}/cars/${id}/reservations`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las reservas del vehículo:", error);
        throw error;
    }
}

export const createReservation = async (data) => {
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
            `${API_URL}/reservations`,
            data,
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        throw error;
    }
}