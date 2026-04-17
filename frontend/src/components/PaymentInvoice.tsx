import React, { useState } from 'react'
const methods = [
  { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe', icon: '₹' },
  { id: 'card', label: 'Card', desc: 'Credit or Debit', icon: '💳' },
  { id: 'cash', label: 'Cash', desc: 'Pay at counter', icon: '💵' },
]
export const PaymentInvoice = ({ amount, slotDetails, onClose, onPay }: any) => {
  const [loading, setLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const handlePayment = async () => {
    setLoading(true)
    setTimeout(() => {
       onPay(selectedMethod)
    }, 1200)
  }
  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {}
        <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-[60px] opacity-20"></div>
           <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <h2 className="text-xl font-black tracking-tight mb-0.5 relative z-10">Confirm Booking</h2>
           <p className="text-slate-400 text-xs font-medium relative z-10">Review and pay to secure your space</p>
        </div>

        {}
        <div className="p-6 pb-3">
           <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                 <span className="font-medium text-slate-500">Facility</span>
                 <span className="font-bold text-slate-900">{slotDetails?.lotName || 'Smart Facility'}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                 <span className="font-medium text-slate-500">Space</span>
                 <span className="font-bold text-slate-900">{slotDetails?.slotnumber || '—'}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                 <span className="font-medium text-slate-500">Type</span>
                 <span className="font-bold text-slate-900 uppercase text-xs">{slotDetails?.type || 'Standard'}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                 <span className="font-medium text-slate-500">Duration</span>
                 <span className="font-bold text-slate-900">2 Hours</span>
              </div>
              <div className="flex justify-between items-center py-3">
                 <span className="text-base font-black text-slate-700">Total</span>
                 <span className="text-2xl font-black text-emerald-600">₹{amount.toFixed(0)}</span>
              </div>
           </div>
        </div>

        {}
        <div className="px-6 pb-3">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Payment Method</p>
           <div className="flex gap-2">
              {methods.map(m => (
                <button 
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`flex-1 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedMethod === m.id 
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-lg block mb-0.5">{m.icon}</span>
                  <span className="text-xs font-bold block">{m.label}</span>
                </button>
              ))}
           </div>
        </div>

        {}
        <div className="px-6 pb-6 pt-3">
           <button 
             onClick={handlePayment}
             disabled={loading}
             className="w-full flex items-center justify-center py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm tracking-wide hover:bg-slate-800 disabled:opacity-70 transition-all shadow-lg shadow-slate-900/10 cursor-pointer"
           >
             {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                   Processing...
                </div>
             ) : (
                `Pay ₹${amount.toFixed(0)}`
             )}
           </button>
           <button onClick={onClose} className="w-full mt-2 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
              Cancel
           </button>
        </div>
      </div>
    </div>
  )
}