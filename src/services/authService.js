// src/services/authService.js
import axios from "../api/axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors de la connexion" };
  }
};

export const register = async (email, password, username) => {
  try {
    const response = await axios.post("/auth/register", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors de l'inscription" };
  }
};
