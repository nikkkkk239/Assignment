import { create } from "zustand"
import { persist } from "zustand/middleware"
import { axiosInstance } from "../lib/AxiosInstance"

export const useLocationStore = create(persist((set,get)=>({
    currentLocation :null,
    setCurrentLocation : (val)=>{
        set({currentLocation:val})
    },
    setLocation :async(data)=>{
        try {
            const response = await axiosInstance.post("/location/save-location",data)
            set({currentLocation:response.data.location})

        } catch (error) {
            console.log("Error in set location , ",error);
            set({currentLocation:null});
        }
    },
    getLocation:async()=>{
        try {
            const response = await axiosInstance.get("/location/get-location");
            set({currentLocation:response.data})
        } catch (error) {
            console.log("Error in get location , ",error);
            set({currentLocation:null});
        }
    }
}),
{
    name:"location-storage",
    getStorage : ()=>localStorage,
}
))