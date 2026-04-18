import React, { useEffect } from 'react'
import { useParking } from '../hooks/useParking'
import { useFacilities } from '../hooks/useFacilities'
import { AddFacilityModal } from '../components/AddFacilityModal'
import { EditFacilityModal } from '../components/EditFacilityModal'

const Facilities = () => {
  const { data, fetchLots } = useParking()
  
  const refresh = () => {
    fetchLots()
  }

  const { showAdd, setShowAdd, editLot, setEditLot, create, update, remove } = useFacilities(refresh)

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">All Facilities</h2>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-slate-800 transition-colors cursor-pointer">
           + Add Facility
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {data.lots.map((l: any, i: number) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-5 bg-white border border-slate-200 shadow-sm rounded-2xl gap-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-700">P</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{l.name}</h3>
                <p className="text-xs font-medium text-slate-500">{l.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-sm font-bold">{l.totalSlots} Slots</p>
              <button 
                onClick={() => setEditLot(l)}
                className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && <AddFacilityModal onClose={() => setShowAdd(false)} onAdd={create} />}
      {editLot && (
        <EditFacilityModal 
          lot={editLot} 
          onClose={() => setEditLot(null)} 
          onUpdate={(id: any, updates: any) => update(id, updates)} 
          onDelete={(id: any) => remove(id)} 
        />
      )}
    </div>
  )
}

export default Facilities
