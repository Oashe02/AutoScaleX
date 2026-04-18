import React, { useEffect } from 'react'
import { useParking } from '../hooks/useParking'
import { useAuth } from '../context/AuthContext'

const Invoices = () => {
  const { data, fetchUserData } = useParking()
  const { loggedIn } = useAuth()

  useEffect(() => {
    if (loggedIn) fetchUserData()
  }, [loggedIn, fetchUserData])

  const totalRevenue = data.myInvoices.reduce((a, inv) => a + (inv.amount || 0), 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">Invoices</h2>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold">
          Total Paid: ₹{totalRevenue.toFixed(0)}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {data.myInvoices.map((inv: any, i: number) => (
          <div key={i} className="grid grid-cols-3 px-5 py-4 border-b border-slate-50 last:border-b-0 items-center">
            <span className="font-mono text-xs font-semibold text-slate-600">INV-{inv._id?.slice(-6).toUpperCase()}</span>
            <span className="font-bold text-sm text-slate-900 text-center">₹{(inv.amount || 0).toFixed(0)}</span>
            <span className="text-xs font-medium text-slate-500 text-right">{inv.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Invoices
