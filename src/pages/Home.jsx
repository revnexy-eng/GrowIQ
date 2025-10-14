import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home(){
  const navigate = useNavigate()
  function cta(){
    const evt = { event: 'cta_click', cta: 'hero_request_demo', page: window.location.pathname, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))
    navigate('/signup?source=hero')
  }
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold">GrowIQ — Marketing Ops Project</h1>
        <p className="mt-4 text-lg">Demo app with GTM-ready dataLayer pushes, CTAs and checkout flow.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/pricing" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-600 shadow-md transition">See Pricing</Link>
        </div>
      </div>
    </section>
  )
}
