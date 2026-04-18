import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'bookings', label: 'My Bookings', path: '/bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'facilities', label: 'Facilities', path: '/facilities', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'invoices', label: 'Invoices', path: '/invoices', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
]

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex-col hidden lg:flex shrink-0">
      <div className="h-20 px-6 flex items-center gap-3 border-b border-slate-100 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-amber-400 font-extrabold text-lg leading-none">P</span>
        </div>
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-900 leading-tight">SmartPark</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Control Panel</p>
        </div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <svg className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
              </svg>
              {tab.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}