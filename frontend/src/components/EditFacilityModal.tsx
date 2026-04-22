import {useState} from 'react'
export const EditFacilityModal = ({ lot, onClose, onUpdate, onDelete }: any) => {
  const [name,setName]=useState(lot?.name || '')
  const [location,setLocation] = useState(lot?.location || '')
  const [total,setTotal] = useState(lot?.total || 10)
  const handleUpdate = (e: any) => {
    e.preventDefault()
    onUpdate(lot._id, { name, location,total })
  }
  const handleDelete = () => {
    onDelete(lot._id)
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
                <h2 className="text-xl font-bold text-slate-900 leading-tight">Edit Facility</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage "{lot?.name}"</p>
             </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">&times;</button>
        </div>

        <form onSubmit={handleUpdate} className="p-8 pb-4 flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Facility Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Location Address</label>
            <input required type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Total Capacity</label>
            <input required min={lot?.total - lot?.availableSlots} type="number" value={total}  onChange={e => setTotal(parseInt(e.target.value))} className={inputClass} />
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Must be {'>'}= {lot?.total - lot?.availableSlots} (currently occupied)</p>
          </div>

          <button type="submit" className="mt-2 w-full py-4 rounded-xl bg-slate-900 text-white font-bold tracking-wide hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 cursor-pointer">
            Save Changes
          </button>
        </form>
        
        <div className="px-8 pb-8 pt-2">
            <button 
                type="button" 
                onClick={handleDelete}
                className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 bg-rose-50 font-bold tracking-wide hover:bg-rose-100 transition-all cursor-pointer"
            >
                Delete Facility
            </button>
        </div>
      </div>
    </div>
  )
}