import React from 'react'
export default function Admin(){
  const users = JSON.parse(localStorage.getItem('mocks_users')||'[]')
  const purchases = JSON.parse(localStorage.getItem('mocks_purchases')||'[]')
  const events = JSON.parse(localStorage.getItem('mocks_events')||'[]')
  const counts = events.reduce((acc,e)=>{ acc[e.event] = (acc[e.event]||0)+1; return acc }, {})
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded">
            <h4 className="font-semibold">Users</h4>
            <div className="text-2xl font-bold">{users.length + 1}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded">
            <h4 className="font-semibold">Purchases</h4>
            <div className="text-2xl font-bold">{purchases.length}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded">
            <h4 className="font-semibold">Event types</h4>
            <pre className="text-sm mt-2">{JSON.stringify(counts,null,2)}</pre>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">All users</h3>
          <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded">{JSON.stringify(users.concat([{email:'admin@mops.com',role:'admin'}]),null,2)}</pre>

          <h3 className="font-semibold mt-4">All purchases</h3>
          <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded">{JSON.stringify(purchases,null,2)}</pre>
        </div>
      </div>
    </section>
  )
}
