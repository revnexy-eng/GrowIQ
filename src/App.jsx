/*
  App.jsx - main app entry with routes and protected routing logic.
  Uses localStorage key 'mopsUser' to store the current session object:
    { email, name, role }
*/
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Checkout from './pages/Checkout.jsx'
import Member from './pages/Member.jsx'
import Admin from './pages/Admin.jsx'
import ThankYou from './pages/ThankYou.jsx'
import NotFound from './pages/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

// Safe helper to read user from localStorage
function getUser(){
  try{ return JSON.parse(localStorage.getItem('mopsUser') || 'null') }catch(e){ return null }
}

/*
  ProtectedRoute checks for logged-in user. If missing, it redirects to /login
  and preserves the intended path via the 'next' query parameter so after login
  the user is returned to the page they originally requested.
*/
function ProtectedRoute({ children, requireRole }){
  const user = getUser()
  const location = useLocation()
  if(!user){
    // redirect to login with next param (encode current path + search)
    return <Navigate to={'/login?next=' + encodeURIComponent(location.pathname + location.search)} replace />
  }
  if(requireRole && user.role !== requireRole){
    return <Navigate to='/' replace />
  }
  return children
}

export default function App(){
  // theme persisted 'light' or 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('mopsTheme') || 'light')
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
    localStorage.setItem('mopsTheme', theme)
  },[theme])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-6">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/pricing' element={<Pricing/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
          <Route path='/thank-you' element={<ProtectedRoute><ThankYou/></ProtectedRoute>} />
          <Route path='/member' element={<ProtectedRoute><Member/></ProtectedRoute>} />
          <Route path='/admin' element={<ProtectedRoute requireRole='admin'><Admin/></ProtectedRoute>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
