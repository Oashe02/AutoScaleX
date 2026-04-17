import React from 'react'
export const ProfileModal = ({ onClose, onLogout, onOpenSettings }: any) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-transparent" onClick={onClose}>
      <div 
        className="absolute top-20 right-8 bg-white border border-slate-200 rounded-3xl w-72 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50 rounded-2xl mb-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-black text-xl shrink-0">
            U
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">Welcome Back</p>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
               <p className="text-xs font-semibold text-slate-500">Active Session</p>
            </div>
          </div>
        </div>
        <div className="p-1 flex flex-col gap-1">
          <button 
             onClick={() => { onOpenSettings(); onClose()}}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
             <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             Account Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
             <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
             Billing & Payments
          </button>
          <div className="h-px bg-slate-100 my-1 mx-2"></div>
          <button 
             onClick={() => { onLogout(); onClose()}} 
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
             <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             Sign Out Securely
          </button>
        </div>
      </div>
    </div>
  )
}