import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function isValidEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }

export default function Signup(){
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const next = params.get('next') // redirect after signup/login
  const plan = params.get('plan')

  useEffect(()=>{
    // if already logged in, go to next or home
    const session = JSON.parse(localStorage.getItem('mopsUser')||'null')
    if(session){
      navigate(next ? decodeURIComponent(next) : '/')
    }
  },[])

  function submit(e){
    e.preventDefault()
    if(!isValidEmail(email)){ setError('Please enter a valid email'); return }
    if(password.length < 1){ setError('Please enter a password'); return }
    const users = JSON.parse(localStorage.getItem('mocks_users')||'[]')
    if(users.find(u=>u.email===email)){ setError('Email exists. Please login.'); return }
    const user = { id: 'u_'+Date.now(), name, email, password, role: 'member' }
    users.push(user)
    localStorage.setItem('mocks_users', JSON.stringify(users))
    localStorage.setItem('mopsUser', JSON.stringify({ email: user.email, role: user.role, name: user.name }))
    const evt = { event: 'sign_up', email, name, plan: plan||null, ts: Date.now() }
    window.dataLayer = window.dataLayer || []; window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]'); events.push(evt); localStorage.setItem('mocks_events', JSON.stringify(events))
    // if there is a next path, navigate there (e.g., continue to checkout)
    if(next){ navigate(decodeURIComponent(next)) }
    else if(plan){ navigate('/checkout?plan='+encodeURIComponent(plan)) }
    else { navigate('/thank-you?lead='+user.id) }
  }

  return (
    <section className="py-12 max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold">Create your account</h2>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-3 border rounded bg-white dark:bg-gray-700" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" className="p-3 border rounded bg-white dark:bg-gray-700" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="p-3 border rounded bg-white dark:bg-gray-700" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-3">
          <button className="btn btn-primary">Sign up</button>
          <button type="button" onClick={()=>navigate('/login')} className="px-4 py-2 border rounded">Have an account? Login</button>
        </div>
      </form>
    </section>
  )
}
