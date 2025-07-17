import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const LOCAL_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  searchedUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isSearchingUser: false,
  onlineUsers: [],
  socket: null,

  // Checks if the user is authenticated (e.g., after page refresh)
  checkAuth: async () => {
    try {
      // Sends a GET request to backend to check auth status
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); // Sets the user data if authenticated
      get().connectSocket();
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
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  searchUser: async (nickname) => {
    set({ isSearchingUser: true });
    try {
      const res = await axiosInstance.get(
        `/auth/searchUser?nickname=${nickname}`
      );
      set({ searchedUser: res.data });
      toast.success("Kullanıcı bulundu");
    } catch (error) {
      toast.error(error.response?.data?.message || "Kullanıcı bulunamadı");
      set({ searchedUser: null });
    } finally {
      set({ isSearchingUser: false });
    }
  },
  clearSearchedUser: () => {
    set({ searchedUser: null });
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logging in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: res.data });

      // send message based on what was updated
      if (data.profilePic && data.fullName) {
        toast.success("Profile updated successfully");
      } else if (data.profilePic) {
        toast.success("Profile picture updated successfully");
      } else if (data.fullName) {
        toast.success("Name updated successfully");
      }
    } catch (error) {
      console.log("Error in updateProfile:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 413) {
        toast.error("Image is too large. Please choose a smaller image.");
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(LOCAL_URL, {
      query: {
        userID: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket }); // set the null socket to user socket

    socket.on("getOnlineUsers", (userIDs) => {
      set({ onlineUsers: userIDs });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
