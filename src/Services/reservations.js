import api from "./api";

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