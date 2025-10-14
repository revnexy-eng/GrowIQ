import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const next = params.get('next')

  function submit(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('mocks_users')||'[]')
    const defaultAdmin = { email: 'admin@mops.com', password: 'admin123', role: 'admin', name: 'Admin' }
    const all = [defaultAdmin, ...users]
    const user = all.find(u=>u.email===email && u.password===password)
    if(!user){ setError('Invalid credentials'); return }
    localStorage.setItem('mopsUser', JSON.stringify({ email: user.email, role: user.role, name: user.name }))
    const evt = { event: 'login', email, ts: Date.now() }
    window.dataLayer = window.dataLayer || []; window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]'); events.push(evt); localStorage.setItem('mocks_events', JSON.stringify(events))
    // after login, go to next if provided, else member or admin
    if(next){ navigate(decodeURIComponent(next)) }
    else { navigate(user.role==='admin'?'/admin':'/member') }
  }

  return (
    <section className="py-12 max-w-md mx-auto px-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" className="p-3 border rounded bg-white dark:bg-gray-700" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-3 border rounded bg-white dark:bg-gray-700" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-3">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </section>
  )
}
