import React from 'react'
export const Navbar = ({ onLoginClick, loggedIn, onLogout }: any) => {
  return (
    <nav className="sticky top-0 z-50 h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
          <span className="text-amber-400 font-black text-xl leading-none">P</span>
        </div>
        <span className="text-2xl font-black tracking-tight text-slate-900">
          Smart<span className="text-slate-400">Park</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {loggedIn && (
          <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 text-xs font-bold text-emerald-600 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            Active
          </span>
        )}
        {loggedIn ? (
          <button 
            onClick={onLogout}
            className="px-5 py-2 text-sm font-bold rounded-xl bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer shadow-sm"
          >
            Sign Out
          </button>
        ) : (
          <button 
            onClick={onLoginClick}
            className="px-6 py-2.5 text-sm font-bold tracking-wide rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}