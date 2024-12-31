import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/AxiosInstance";
import toast from "react-hot-toast";

export const useAddressStore = create(persist((set,get)=>({
    address:null,
    getAddress : async()=>{
        try {
            const response = await axiosInstance.get("/address/get-addresses")
            set({address : response.data})
        } catch (error) {
            console.log("Error in getAddress , :",error)
            toast.error(error.response.data.message);
            set({address : null})
        }
    },
    setHome:async(details)=>{
        try {
            const response = await axiosInstance.post("/address/add-home",details)
            set({address : response.data.address});
            console.log("Address , ",get().address)
        } catch (error) {
            console.log("Error in setHome , :",error)
            toast.error(error.response.data.message);
        }
    },
    setOffice:async(details)=>{
        try {
            const response = await axiosInstance.post("/address/add-office",details)
            set({address : response.data.address});
        } catch (error) {
            console.log("Error in setOffice , :",error)
            toast.error(error.response.data.message);
        }
    },
    setFamily:async(details)=>{
        try {
            const response = await axiosInstance.post("/address/add-family",details)
            set({address : response.data.address});
        } catch (error) {
            console.log("Error in setFamily , :",error)
            toast.error(error.response.data.message);
        }
    },
}),{
    name:"address-storage",
    getStorage : ()=>localStorage,
}))