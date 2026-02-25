import { create } from 'zustand';
import { axiosInstance } from "../lib/axios"
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set) => ({   //(set,get) can be used
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in authCheck:", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {

            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            // toast
            toast.success("Account created successfully!");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");

        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {

            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            // toast
            toast.success("Logged in successfully");

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");

        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },
}))