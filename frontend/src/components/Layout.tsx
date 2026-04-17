import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useAuth } from '../context/AuthContext'

export const Layout = () => {
  const { logout } = useAuth()
  
  return (
    <div className="min-h-screen flex text-slate-900 font-sans selection:bg-amber-200">
      <Sidebar />
      
      <main className="flex-1 w-full flex flex-col h-screen overflow-y-auto bg-slate-50">
        <header className="sticky top-0 z-40 p-4 lg:p-6 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm w-full">
           <div className="flex items-center gap-3">
              <span className="text-xl font-black text-slate-900">SmartPark</span>
           </div>
           
           <div className="flex items-center gap-3">
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold"
              >
                Logout
              </button>
           </div>
        </header>

        <div className="p-4 lg:p-8 w-full max-w-6xl mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
