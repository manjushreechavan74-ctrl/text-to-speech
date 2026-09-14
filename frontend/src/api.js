import axios from "axios";

const api = axios.create({
  baseURL: "",
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Authentication
export const registerUser = (payload) =>
  api.post("/api/auth/register", payload).then((response) => response.data);

export const loginUser = (payload) =>
  api.post("/api/auth/login", payload).then((response) => response.data);

// Voices
export const getVoices = () =>
  api.get("/api/voices").then((response) => response.data);

// Text-to-speech
export const generateSpeech = (payload) =>
  api.post("/api/tts", payload).then((response) => response.data);

// History
export const getHistory = () =>
  api.get("/api/history").then((response) => response.data);

export const deleteHistory = (id) =>
  api.delete(`/api/history/${id}`).then((response) => response.data);

// Favorites
export const getFavorites = () =>
  api.get("/api/favorites").then((response) => response.data);

export const addFavorite = (payload) =>
  api.post("/api/favorites", payload).then((response) => response.data);

export const deleteFavorite = (id) =>
  api.delete(`/api/favorites/${id}`).then((response) => response.data);

export default api;