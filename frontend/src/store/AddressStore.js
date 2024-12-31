import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/AxiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

export const useAddressStore = create(persist((set,get)=>({
    address:{
        home:"",
        office:"",
        family:"",
        favorite:"",
        recentSearches:[],
        userId:0,
    },
    getAddress : async()=>{
        try {
            const response = await axiosInstance.get("/address/get-addresses")
            set({address : response.data})
            set({address: {...get().address , recentSearches:get().address.recentSearches.reverse()}})

        } catch (error) {
            console.log("Error in getAddress , :",error)
            toast.error(error.response.data.message);
            set({address :{
                home:"",
                office:"",
                recentSearches:[],
                family:"",
                favorite:"",

                userId:0,
            }})
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
            console.log("Error in setFamily :",error)
            toast.error(error.response.data.message);
        }
    },
    setFavour:async(details)=>{
        try {
            const response = await axiosInstance.post("/address/add-favour",details)
            set({address : response.data.address});
        } catch (error) {
            console.log("Error in setFamily  :",error)
            toast.error(error.response.data.message);
        }
    },
    addInRecentSearch : async(details)=>{
        try {
            if(details == undefined) return ;
            if(!details) return ;
            const response = await axiosInstance.post("/address/add-recent",details);
            set({address:{
                ...get().address,
                recentSearches:response.data.address.recentSearches.reverse()
            }});
        } catch (error) {
            console.log("Error in addInRecentSearch :",error)
            toast.error(error.response.data.message);
        }
    },
    removeFromRecent : async(details)=>{
        try {
            const response = await axiosInstance.post("/address/remove-recent",details);
            set({address:{
                ...get().address,
                recentSearches:response.data.address.recentSearches.reverse()
            }});
        } catch (error) {
            console.log("Error in removeFromRecent :",error)
            toast.error(error.response.data.message);
        }
    }
}),{
    name:"address-storage",
    getStorage : ()=>localStorage,
}))