import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages: async (userID) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`messages/${userID}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isMessagesLoading:true})
        }
    },

    setSelectedUser:(selectedUser) => set({selectedUser})

}))