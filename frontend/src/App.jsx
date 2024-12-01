import React, { useEffect } from 'react'
import Navbar from "./components/navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { Toaster } from 'react-hot-toast'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const {authUser,checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

    if(isCheckingAuth && !authUser) return (
      <div className='flex items-center justify-center h-screen'>
          <span className="loading loading-spinner loading-lg"></span>
          {/* <span className="loading loading-dots loading-lg"></span> */}
          
      </div>
    )

  


  return (
    <div data-theme = {theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ?<ProfilePage/> : <Navigate to="/login"/>}/>
        
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App