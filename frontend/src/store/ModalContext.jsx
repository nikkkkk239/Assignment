import { createContext, useEffect, useState } from "react";

export const modalContext = createContext();

export const ModalContextProvider = ({children})=>{
    const [homeModalOpen , setHomeModalOpen] = useState(true)
    useEffect(()=>{
        const local = localStorage.getItem("homeModal");
        setHomeModalOpen(local ? JSON.parse(local) : true)
    },[])
    return <modalContext.Provider value={{homeModalOpen,setHomeModalOpen}}>
        {children}
    </modalContext.Provider>
}