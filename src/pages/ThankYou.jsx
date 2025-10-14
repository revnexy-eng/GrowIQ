import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function ThankYou(){
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const purchaseId = params.get('purchase')
  const [purchase, setPurchase] = useState(null)

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem('mocks_purchases')||'[]')
    const p = all.find(x=>x.id===purchaseId)
    setPurchase(p||null)
    const evt = { event: 'page_view', page: '/thank-you', purchaseId, ts: Date.now() }
    window.dataLayer = window.dataLayer || []; window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events')||'[]'); events.push(evt); localStorage.setItem('mocks_events', JSON.stringify(events))
  },[purchaseId])

  return (
    <section className="py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">🎉 Thank you!</h2>
        {purchase ? (
          <div className="mt-4 text-left bg-white dark:bg-gray-800 p-4 rounded">
            <p>Purchase ID: <strong>{purchase.id}</strong></p>
            <p>Plan: <strong>{purchase.planName}</strong></p>
            <p>Purchaser: <strong>{purchase.purchaser}</strong></p>
            <p className="mt-2">We received your order. You can view your purchases on the <Link to="/member" className="underline">Member page</Link>.</p>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">We received your request. We'll be in touch shortly.</p>
        )}
        <div className="mt-6"><Link to='/' className="underline">Return home</Link></div>
      </div>
    </section>
  )
}
