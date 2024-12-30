import {create} from "zustand";
import toast from "react-hot-toast"
import {persist} from "zustand/middleware"
import { axiosInstance } from "../lib/AxiosInstance";

export const useAuthStore = create(
    persist((set,get)=>({
    isCheckingAuth : true,
    isSigningUp : false,
    isLoggingIn:false,
    addressSelected : null,
    setAddressSelected:(val)=>{
        set({addressSelected : val})
    },
    currentLocation:null,
    setCurrentLocation:(val)=>{
        set({currentLocation:val})
    },
    authUser : null,
    isPermissionGiven : false,
    setPermissionGiven:(val)=>{
        set({isPermissionGiven : val})
    },
    checkUser:async()=>{
        try {
            const response = await axiosInstance.get("/auth/checkAuth")
            set({authUser : response.data})
        } catch (error) {
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth : false});
        }
    },signup:async(details)=>{
        try {
            set({isSigningUp:true})
            const response = await axiosInstance.post("/auth/signup",details);
            toast.success("Account created successful.")
            set({authUser : response.data});
        } catch (error) {
            console.log("Error in singup : ",error);
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp : false})
        }
    },
    login:async(details)=>{
        try {
            set({isLoggingIn:true})
            const response = await axiosInstance.post("/auth/login",details);
            toast.success("Logged In successful.")
            set({authUser : response.data});
        } catch (error) {
            console.log("Error in login : ",error);
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn : false})
        }
    }
}),{
    name:"auth-storage",
    getStorage : ()=>localStorage,
}))