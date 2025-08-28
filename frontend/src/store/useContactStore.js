import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useContactStore = create((set, get) => ({
  contacts: [],
  isContactsLoading: false,
  isAddingContact: false,

  sendedRequests: [],
  receivedRequests: [],
  isGettingRequests: false,

  getContacts: async () => {
    set({ isContactsLoading: true });

    try {
      const res = await axiosInstance.get("/contacts/getContacts");
      console.log("Contacts:", res.data);
      set({ contacts: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  addContact: async (receiverID) => {
    set({ isAddingContact: true });

    try {
      const res = await axiosInstance.post(
        `/contacts/sendContactRequest?receiverID=${receiverID}`
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAddingContact: false });
    }
  },

  getRequests: async () => {
    set({ isGettingRequests: true });
    try {
        const res = await axiosInstance.get("/contacts/getContactRequests")
        set({receivedRequests:res.data.received})
        set({sendedRequests:res.data.sent})
    } catch (error) {
      toast.error("Error:",error);
    } finally {
      set({ isGettingRequests: false });
    }
  },
}));
