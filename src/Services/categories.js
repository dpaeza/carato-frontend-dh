import api from "./api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/categories";

export const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error;
    }
};

export const getCategoryByIdOrName = async (value) => {
    try {
        const response = await api.get(`/categories/${value}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener categoría", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        throw error;
    }
};

export const editCategory = async (id, data) => {
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
        const response = await axios.put(`${API_URL}/${id}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al editar la categoría:", error);
        throw error;
    }
};

export const addCategory = async (data) => {
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
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al agregar la categoría:", error);
        throw error;
    }
}