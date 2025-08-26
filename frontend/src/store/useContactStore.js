import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore"


export const useContactStore = create( (set,get) => ({
    contacts : [],
    isContactsLoading : false,

    getContacts : async () => {
        set({isContactsLoading:true})

        try {
            const res = await axiosInstance.get("/contacts/getContacts")
            console.log("Contacts:", res.data)
            set({contacts: res.data})
        } catch (error) {
            toast.error(error.response.data.messages)
        } finally{
            set({isContactsLoading:false})
        }
    }

}))