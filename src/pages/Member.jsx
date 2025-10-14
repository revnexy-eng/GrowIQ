import React from 'react'

export default function Member(){
  const user = JSON.parse(localStorage.getItem('mopsUser')||'null')
  const purchases = JSON.parse(localStorage.getItem('mocks_purchases')||'[]').filter(p=>p.purchaser===user?.email)
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Member Dashboard</h2>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name || user?.email}.</p>
        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded">
          <h3 className="font-semibold">Account details</h3>
          <pre className="text-sm mt-2">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Purchase history</h3>
          {purchases.length===0 ? <p className="text-sm text-gray-600 mt-2">No purchases yet.</p> : (
            <ul className="mt-2 space-y-3">
              {purchases.map(p=> (
                <li key={p.id} className="bg-white dark:bg-gray-800 p-3 rounded">
                  <div className="font-semibold">{p.planName} {p.price?('- $'+p.price):''}</div>
                  <div className="text-xs text-gray-500">{new Date(p.ts).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
