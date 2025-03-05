import api from "./api";

export const getBrands = async () => {
  try {
    const response = await api.get("/cars/brands");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    throw error;
  }
}

export const getFuelTypes = async () => {
    try {
        const response = await api.get("/cars/gasolines");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los tipos de combustible:", error);
        throw error;
    }
}

export const getTransmissions = async () => {
    try {
        const response = await api.get("/cars/transmissions");
        return response.data;
    }   
    catch (error) {
        console.error("Error al obtener los tipos de transmisión:", error);
        throw error;
    }
}

export const getBrakeTypes = async () => {
    try {
        const response = await api.get("/cars/brake-systems");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los tipos de frenos:", error);
        throw error;
    }
}