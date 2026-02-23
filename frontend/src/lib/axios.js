import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5173/api" : "/api", // development -> http://localhost:5173/api, production -> /api cause both frontend and backend are in same domain
    withCredentials: true,
    
})