import React, { useState, useEffect } from 'react'

/*
ContactPopup.jsx
- Slide-in panel from the right/bottom depending on screen size
- Dim background overlay
- Fields: name, email, message
- Simple email validation
- Saves submissions to localStorage key: growiq_messages
- Protected: if user not logged in (localStorage 'mopsUser'), shows prompt to login
*/

export default function ContactPopup({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(()=>{ setIsClient(true) }, [])

  const isLoggedIn = isClient && !!localStorage.getItem('mopsUser')

  function handleChange(e){
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function validEmail(email){
    return /^\S+@\S+\.\S+$/.test(email)
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!isLoggedIn){
      // If not logged in, prompt user to login first
      alert('Please log in or sign up before sending a request.')
      onClose()
      return
    }
    if(!form.name || !form.email || !form.message){
      alert('Please fill all fields.')
      return
    }
    if(!validEmail(form.email)){
      alert('Please enter a valid email.')
      return
    }
    setSubmitting(true)
    // simulate a small delay
    setTimeout(()=>{
      const existing = JSON.parse(localStorage.getItem('growiq_messages')||'[]')
      const item = { id: 'm_'+Date.now(), name: form.name, email: form.email, message: form.message, ts: Date.now() }
      existing.push(item)
      localStorage.setItem('growiq_messages', JSON.stringify(existing))
      setSubmitting(false)
      setShowThanks(true)
      // show thanks then close and clear form
      setTimeout(()=>{
        setShowThanks(false)
        setForm({ name: '', email: '', message: '' })
        onClose()
      }, 1800) // close after brief thank you
    }, 600)
  }

  if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* dim overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* panel */}
      <div className="absolute right-4 bottom-6 w-full max-w-sm sm:top-20 sm:bottom-auto sm:right-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 transform transition-transform duration-300"
          style={{ animation: 'growiq-slide 0.3s ease' }}
          onClick={(e)=>e.stopPropagation()}
        >
          {showThanks ? (
            <div className="text-center text-green-600 font-semibold py-6">Thanks for reaching out!</div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">Request a Demo</h3>
              {!isLoggedIn && (
                <div className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded mb-3">
                  You must be logged in to request a demo. Please login or sign up first.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-sm block mb-1">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="text-sm block mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="text-sm block mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="w-full border rounded px-3 py-2 h-28 resize-none" required />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={onClose} className="px-3 py-2 rounded border">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
                    {submitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
