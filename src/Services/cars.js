import api from "./api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/cars";

export const getCars = async ({
    page = 1,
    size = 10,
    query = "",
    categoriesId = "",
}) => {
    try {

        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        };

        let response = [];

        if (token) {
            headers.Authorization = `Bearer ${token}`;
            response = await axios.get(API_URL, { headers, params: { page, size, query, categoriesId } });
            
        } else {
            response = await api.get("/cars", {
                params: { page, size, query, categoriesId },
            });
        }
        
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error al obtener los autos:", error);
        throw error;
    }
};

export const getAllCarsCount = async () => {
    try {
        const response = await api.get("/cars/count");
        return response.data;
    } catch (error) {
        console.error("Error al obtener la cantidad de autos:", error);
        throw error;
    }
}

export const getRandomCars = async (limit = 10) => {
    try {
        const response = await api.get("/cars/random", { params: { limit } });
        return response.data;
    } catch (error) {
        console.error("Error al obtener autos aleatorios:", error);
        throw error;
    }
};

export const getCarByIdOrName = async (value) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        };

        let response = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
            response = await axios.get(`${API_URL}/${value}`, { headers });
        } else {
            response = await api.get(`/cars/${value}`);
        }
        
        return response.data;
    } catch (error) {
        console.error("Error al obtener el auto:", error);
        throw error;
    }
};

export const createCar = async (carData) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.post(API_URL, carData, { headers });

        return response.data;
    } catch (error) {
        console.error("Error al crear el auto:", error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        const userData = JSON.parse(localStorage.getItem("auth"));
        const token = userData ? userData.token : null;

        const headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.put(`${API_URL}/${id}`, carData, {
            headers,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error al actualizar el auto:", error);
        throw error;
    }
};

export const deleteCar = async (id) => {
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

        const response = await axios.delete(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el auto:", error);
        throw error;
    }
};
