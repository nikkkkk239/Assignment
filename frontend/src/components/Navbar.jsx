import React from 'react'
import { MdLogout } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { useAuthStore } from '../store/AuthStore';
import { useAddressStore } from '../store/AddressStore';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
    const {authUser,logout,setAddressSelected,setPermissionGiven} = useAuthStore()
    const navigate = useNavigate();
    const {address} = useAddressStore();
    const formatAddress = (address)=>{
        const parts = address?.split(",");
        const required = parts?.slice(0, 2)?.join(",");
        return required;
      }
      const handleLogout = ()=>{
        setAddressSelected(null)
        setPermissionGiven(false)
        sessionStorage.clear();
        localStorage.clear();
        localStorage.removeItem("auth-storage")
        logout();
      }
  return (
    <div className='navbar'>
        <div className='logo'>
            <FaLocationArrow/>
        </div>
        <div className='buttons'>
            <div className='written'>
            <div className='name'>{authUser.name}</div>
            <div className='favourAdd' style={{cursor:'pointer',display:'flex',alignItems:"center"}} onClick={()=>navigate('/yourlocation')}>{address.favorite.length == 0 ? "Not saved":formatAddress(address.favorite).slice(0,16)} <IoMdArrowDropdown/></div>
            </div>
            <button className='logoutBtn' onClick={handleLogout}><MdLogout/></button>
        </div>
    </div>
  )
}

export default Navbar