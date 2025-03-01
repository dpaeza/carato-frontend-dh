import api from "./api";
import axios from "axios";

const API_URL = "http://localhost:8080/api/cars";

export const getCars = async (page = 1, size = 10, query = "") => {
    try {
        const response = await api.get("/cars", { params: { page, size, query } });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los autos:", error);
        throw error;
    }
};

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
        const response = await api.get(`/cars/${value}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el auto:", error);
        throw error;
    }
};

export const createCar = async (carData) => {
    try {
      // Obtén el token del localStorage
      const userData = JSON.parse(localStorage.getItem('auth'));
      const token = userData ? userData.token : null;
  
      // Configura los headers
      const headers = {
        "Content-Type": "multipart/form-data", // Para enviar archivos
        "Accept": "application/json", // Aceptar respuestas en JSON
      };
  
      // Si hay un token, agrega el header de autorización
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      // Realiza la solicitud POST
      const response = await axios.post(API_URL, carData, { headers });
  
      // Retorna la respuesta
      return response.data;
    } catch (error) {
      console.error("Error al crear el auto:", error);
      throw error;
    }
  };

export const updateCar = async (id, carData) => {
    try {
        const response = await api.put(`/cars/${id}`, carData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el auto:", error);
        throw error;
    }
};

export const deleteCar = async (id) => {
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

        const response = await axios.delete(`${API_URL}/${id}`, {headers});
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el auto:", error);
        throw error;
    }
};