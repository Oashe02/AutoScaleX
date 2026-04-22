import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AuthPopup } from './authPopup'
import { useParking } from '../hooks/useParking'

export const LandingPage = () => {
  const { login } = useAuth()
  const { data, fetchLots } = useParking()
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)
  
  useEffect(() => {
    fetchLots()
  }, [fetchLots])

  const handleLogin = (token: string) => {
    login(token)
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200 overflow-hidden">
      <header className="px-6 lg:px-10 h-20 flex items-center justify-between border-b border-slate-200/80 bg-white/50 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">P</span>
           </div>
           <span className="text-xl font-bold tracking-tight text-slate-900">SmartPark</span>
        </div>
        <button onClick={() => setShowAuth(true)} className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all text-sm">
          Sign In
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 lg:pt-32 px-6 relative z-10 w-full max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Allocation Engine Live</span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl text-center leading-[1.1]">
          Intelligent parking, <br className="hidden sm:block" />
          <span className="text-slate-400">dynamically allocated.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl text-center mb-10 leading-relaxed font-medium">
          Eliminate congestion and maximize utilization. SmartPark uses predictive demand routing to instantly assign the perfect slot before you arrive.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button onClick={() => setShowAuth(true)} className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md focus:ring-4 focus:ring-slate-900/10">
            Dashboard Login
          </button>
          <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center gap-2" onClick={() => window.open('https://github.com/Oashe02/AutoScaleX', '_blank')}>
             View Documentation
          </button>
        </div>
        
        <div className="mt-20 lg:mt-28 w-full max-w-4xl border border-slate-200/80 rounded-t-3xl bg-white shadow-2xl shadow-slate-200/40 min-h-72 sm:min-h-96 overflow-hidden relative">
           <div className="absolute top-0 inset-x-0 h-12 border-b border-slate-100 flex items-center px-6 gap-2 bg-slate-50/80 backdrop-blur-sm">
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
             <span className="text-[10px] font-bold text-slate-400 ml-2 tracking-widest uppercase">Live Facilities</span>
           </div>
           <div className="pt-20 px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pb-20">
               {data.lots.length > 0 ? (
                 data.lots.slice(0, 3).map((lot: any) => (
                   <div key={lot._id} className="h-40 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm p-5 flex flex-col group hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="px-2 py-0.5 rounded-md bg-white border border-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Facility</div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{lot.name}</h3>
                      <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{lot.location}</p>
                      <div className="mt-auto pt-3 flex items-center justify-between">
                         <span className="text-[10px] font-black text-slate-400">{lot.totalSlots} Slots</span>
                         <div className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                         </div>
                      </div>
                   </div>
                 ))
               ) : (
                 [1, 2, 3].map((i) => (
                   <div key={i} className="h-40 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm p-5 flex flex-col justify-between animate-pulse">
                      <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                      <div className="w-full h-8 bg-white rounded-lg border border-slate-100 mt-auto"></div>
                   </div>
                 ))
               )}
           </div>
           <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
      </main>
      
      {showAuth && <AuthPopup closePopup={() => setShowAuth(false)} setLoggedIn={handleLogin} />}
    </div>
  )
}
