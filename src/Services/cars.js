import api from "./api";

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
      const response = await api.post("/cars", carData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      const response = await api.delete(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el auto:", error);
      throw error;
    }
  };