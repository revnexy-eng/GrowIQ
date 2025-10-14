import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function getUser(){ try{ return JSON.parse(localStorage.getItem('mopsUser')||'null') }catch(e){return null} }

export default function Navbar({theme,setTheme}){
  const user = getUser()
  const navigate = useNavigate()
  function logout(){
    localStorage.removeItem('mopsUser')
    navigate('/login')
  }
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to='/' className="font-bold text-xl flex items-center gap-3">
          <img src="/assets/logo.png" alt="GrowIQ" style={{height:36}} />
          <span>GrowIQ</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          {user ? <Link to="/member" className="hover:underline">Member</Link> : <Link to="/signup" className="hover:underline">Sign up</Link>}
          {user && user.role==='admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
          {!user ? <Link to="/login" className="bg-primary text-white px-3 py-1 rounded">Login</Link> : <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>}
          <button onClick={() => setTheme(theme==='dark'?'light':'dark')} className="ml-2 px-2 py-1 border rounded">{theme==='dark'?'Light':'Dark'}</button>
        </nav>
      </div>
    </header>
  )
}
