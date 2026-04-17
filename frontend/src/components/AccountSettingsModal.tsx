import { useState } from 'react'
export const AccountSettingsModal = ({ onClose, onSave }: any) => {
  const [name, setName] = useState('Authenticated User')
  const [email, setEmail] = useState('user@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [vehicleNumber, setVehicleNumber] = useState('DL-01-AB-1234')
  const [loading, setLoading] = useState(false)
  const handleSave = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
        onSave({ name, email, phone, vehicleNumber })
        setLoading(false)
    }, 1000)
  }
  const inputClass = "w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all placeholder:text-slate-400"
  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-black">
                U
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">Account Settings</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage your personal profile</p>
             </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">&times;</button>
        </div>

        <form onSubmit={handleSave} className="p-8 flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Full Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Phone Number</label>
            <input required type="text" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Vehicle Number</label>
            <input required type="text" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} className={inputClass} />
          </div>

          <button type="submit" disabled={loading} className="mt-4 w-full flex items-center justify-center py-4 rounded-xl bg-slate-900 text-white font-bold tracking-wide hover:bg-slate-800 disabled:bg-slate-700 transition-all shadow-lg shadow-slate-900/10 cursor-pointer">
            {loading ? 'Saving Changes...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}