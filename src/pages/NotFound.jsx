import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="mt-4">Return to <Link to='/'>home</Link>.</p>
    </section>
  )
}
