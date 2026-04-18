import {useState} from 'react'
const API=import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api'
export const AuthPopup=({ closePopup,setLoggedIn}:any)=>{
  const [isLogin,setIsLogin]=useState(true)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [name,setName]=useState('')
  const [vehicleNumber,setVehicleNumber]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setErr('')
    try {
      const endpoint=isLogin?'/auth/login':'/auth/register'
      const body:any={ email,password }
      if (!isLogin){
        body.phone=phone
        body.name=name
        body.vehicleNumber=vehicleNumber
      }
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || data.error || 'Authentication failed')
      const token = data?.data?.tkn || data?.token
      if (token) {
        localStorage.setItem('token', token)
        setLoggedIn(true)
        closePopup()
      } else if (!isLogin) {
        setIsLogin(true)
        setErr('Account created successfully. Please sign in.')
      } else {
        throw new Error('No token received')
      }
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }
  const inputClass = "w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all placeholder:text-slate-400"
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={closePopup}>
      <div
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-amber-400 font-black text-sm">P</span>
             </div>
             <h2 className="text-xl font-bold text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          </div>
          <button onClick={closePopup} className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {}
        <div className="p-8">
          {err && (
            <div className={`px-5 py-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-3 ${err.includes('successfully') ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-600'}`}>
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {err.includes('successfully') ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
              </svg>
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Full Name</label>
                <input type="text" placeholder="John Doe" value={name} required onChange={e => setName(e.target.value)} className={inputClass} />
              </div>
            )}

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} required onChange={e => setEmail(e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Password</label>
              <input type="password" placeholder="••••••••" value={password} required onChange={e => setPassword(e.target.value)} className={inputClass} />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Phone Number</label>
                  <input type="text" placeholder="+91 98765 43210" value={phone} required onChange={e => setPhone(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Vehicle Number</label>
                  <input type="text" placeholder="DL-01-AB-1234" value={vehicleNumber} required onChange={e => setVehicleNumber(e.target.value)} className={inputClass} />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 rounded-xl bg-slate-900 text-white font-bold tracking-wide hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-slate-900/10"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In Securely' : 'Create Account'}
            </button>

            <p className="text-center text-sm font-medium text-slate-500 mt-2">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => { setIsLogin(!isLogin); setErr('')}} className="text-amber-500 font-bold cursor-pointer hover:text-amber-600 transition-colors">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}