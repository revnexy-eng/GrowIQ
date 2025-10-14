import React from 'react'
import { useNavigate } from 'react-router-dom'

const plans = [
  { id: 'basic', name: 'Basic', price: 0, label: '$0' },
  { id: 'pro', name: 'Pro', price: 49, label: '$49/mo' },
  { id: 'enterprise', name: 'Enterprise', price: 'Contact', label: 'Contact' },
]

export default function Pricing(){
  const navigate = useNavigate()
  function handleCTA(planId){
    const evt = { event: 'cta_click', cta: 'choose_plan', plan: planId, page: window.location.pathname, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))
    // go to checkout; Checkout is protected and will redirect to login if not logged in
    navigate('/checkout?plan='+encodeURIComponent(planId))
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {plans.map(p=> (
            <div key={p.id} className="p-6 border rounded bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Plan {p.name}</p>
              <div className="mt-4 text-2xl font-bold">{p.label}</div>
              <div className="mt-6">
                <button onClick={()=>handleCTA(p.id)} className="btn btn-primary">Buy {p.name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
