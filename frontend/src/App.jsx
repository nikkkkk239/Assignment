import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

import { useEffect, useState } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import './App.css'
import {Toaster} from "react-hot-toast"
import { useAuthStore } from './store/AuthStore'

function App() {
  const {authUser,checkUser,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkUser()
  },[checkUser])
  if(isCheckingAuth) return <div>Loading.....</div>
  return (
    <>
    <Routes>
      <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to="/"/> : <Signup/>}/>
      <Route path='/' element={authUser ?<Home/>  : <Navigate to="/login"/> }/>
      <Route path="/"/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
