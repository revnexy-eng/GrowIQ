import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Simple helper to get plan metadata
const PLANS = {
  basic: { id:'basic', name:'Basic', price:0 },
  pro: { id:'pro', name:'Pro', price:49 },
  enterprise: { id:'enterprise', name:'Enterprise', price:null }
}

export default function Checkout(){
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const planId = params.get('plan') || 'basic'
  const plan = PLANS[planId] || PLANS.basic
  const navigate = useNavigate()

  // prefill user info if logged in
  const session = JSON.parse(localStorage.getItem('mopsUser')||'null')
  const [name, setName] = useState(session?.name || '')
  const [email, setEmail] = useState(session?.email || '')
  const [card, setCard] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{
    // if not logged in, the route is protected by ProtectedRoute, so user should be present
  },[])

  function submit(e){
    e.preventDefault()
    if(!email || !name){ setError('Please fill name and email'); return }
    if(card.length < 4){ setError('Please provide a valid card number (mock)'); return }
    // save purchase to localStorage (mini history)
    const purchases = JSON.parse(localStorage.getItem('mocks_purchases')||'[]')
    const purchase = { id: 'p_'+Date.now(), plan: plan.id, planName: plan.name, price: plan.price, purchaser: email, name, ts: Date.now() }
    purchases.push(purchase)
    localStorage.setItem('mocks_purchases', JSON.stringify(purchases))
    // push event to dataLayer for GTM/GA later
    const evt = { event: 'purchase', purchaseId: purchase.id, plan: plan.id, price: plan.price, purchaser: email, ts: Date.now() }
    window.dataLayer = window.dataLayer || []; window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]'); events.push(evt); localStorage.setItem('mocks_events', JSON.stringify(events))
    // redirect to thank-you page with purchase id
    navigate('/thank-you?purchase='+purchase.id)
  }

  return (
    <section className="py-12 max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold">Checkout — {plan.name}</h2>
      <div className="mt-4 bg-white dark:bg-gray-800 p-6 rounded">
        <p className="mb-4">You are purchasing: <strong>{plan.name}</strong> {plan.price!==null?('- $'+plan.price):''}</p>
        <form onSubmit={submit} className="grid gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-3 border rounded bg-white dark:bg-gray-700" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded bg-white dark:bg-gray-700" />
          <input value={card} onChange={e=>setCard(e.target.value)} placeholder="Card number (mock)" className="p-3 border rounded bg-white dark:bg-gray-700" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-3 mt-4">
            <button className="btn btn-primary">Confirm Purchase</button>
            <button type="button" onClick={()=>navigate('/pricing')} className="px-4 py-2 border rounded">Change plan</button>
          </div>
        </form>
      </div>
    </section>
  )
}
