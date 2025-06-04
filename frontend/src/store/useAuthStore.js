import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // Checks if the user is authenticated (e.g., after page refresh)
  checkAuth: async () => {
    try {
      // Sends a GET request to backend to check auth status
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); // Sets the user data if authenticated
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null }); // Sets user as null if not authenticated
    } finally {
      set({ isCheckingAuth: false }); // Auth check is finished
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login",data)
        set({authUser:res.data})
        toast.success("Logging in successfully")
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
        set({isLoggingIn:false})
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
