import {useState} from 'react'
export const AddFacilityModal = ({ onClose, onAdd }: any) => {
  const [name,setName]=useState('')
  const [location,setLocation]=useState('')
  const [total,setTotal]=useState(10)
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    onAdd({ name,location,total,availableSlots:total })
  }
  const inputClass = "w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all placeholder:text-slate-400"
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center font-black">
                P
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">Create Facility</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Setup a new parking zone</p>
             </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Facility Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Metro Plaza Garage" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Location Address</label>
            <input required type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. 5th Avenue, NY" className={inputClass} />
          </div>
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Total Capacity (Spots)</label>
        <input required min="5" max="250" type="number" value={total} onChange={e => setTotal(parseInt(e.target.value))} className={inputClass} />
          </div>

          <button type="submit" className="mt-2 w-full py-4 rounded-xl bg-slate-900 text-white font-bold tracking-wide hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 cursor-pointer">
            Deploy Facility
          </button>
        </form>
      </div>
    </div>
  )
}