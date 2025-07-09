import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";



const LOCAL_URL = "http://192.168.1.119:5001"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Checks if the user is authenticated (e.g., after page refresh)
  checkAuth: async () => {
    try {
      // Sends a GET request to backend to check auth status
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); // Sets the user data if authenticated
      get().connectSocket()
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
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data })
      toast.success("Logging in successfully")
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })

    try {
      const res = await axiosInstance.put("/auth/updateProfile", data)
      set({ authUser: res.data })
      toast.success("Profile updates succesfully")
    } catch (error) {
      console.log("error in update profile:", error)
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return
    const socket = io(LOCAL_URL, {
      query: {
        userID: authUser._id
      }
    })
    socket.connect()

    set({ socket: socket }) // set the null socket to user socket

    socket.on("getOnlineUsers", (userIDs) => {
      set({ onlineUsers: userIDs })
    })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect()
  }
}));
