import { useEffect, useState } from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import './App.css';
import { useAuthStore } from './store/AuthStore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SelectAddress from './pages/SelectAddress';
import { Toaster } from 'react-hot-toast';
import YourLocation from './pages/YourLocation';
import NoPageFound from './pages/NoPageFound';



function App() {
  const {authUser , checkUser} = useAuthStore()
  useEffect(()=>{
    checkUser();
  },[checkUser])

  return (
    <>
      <Routes>
        <Route path='/login' element={authUser ? <Navigate to="/"/> :<Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to="/"/> :<Signup/>}/>
        <Route path='/' element={authUser ? <Home/> :<Navigate to="/login"/>}/>
        <Route path='/selectAddress' element={authUser ? <SelectAddress/> :<Navigate to="/login"/>}/>
        <Route path='/yourlocation' element={authUser ?<YourLocation/> :<Navigate to="/login"/>}/>
        <Route path="*" element={<NoPageFound/>}/>


      </Routes>
      <Toaster/>
    </>
  )
}

export default App
