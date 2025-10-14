import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContactPopup from './ContactPopup'

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('mopsUser') || 'null')
  } catch (e) {
    return null
  }
}

export default function Navbar({ theme, setTheme }) {
  const user = getUser()
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)

  function logout() {
    localStorage.removeItem('mopsUser')
    navigate('/login')
  }

  function handleRequestDemo() {
    if (!user) navigate('/login')
    else setShowPopup(true)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow relative">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl flex items-center gap-3">
          <img src="/assets/logo.png" alt="GrowIQ" style={{ height: 36 }} />
          <span>GrowIQ</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          {user ? (
            <Link to="/member" className="hover:underline">Member</Link>
          ) : (
            <Link to="/signup" className="hover:underline">Sign up</Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" className="hover:underline">Admin</Link>
          )}
          <button
            onClick={handleRequestDemo}
            className="bg-primary text-white px-3 py-1 rounded"
          >
            Request a Demo
          </button>
          {!user ? (
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
          ) : (
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          )}
        </nav>
      </div>

      <ContactPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </header>
  )
}
