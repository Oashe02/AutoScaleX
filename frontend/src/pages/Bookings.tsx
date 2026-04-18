import React, { useEffect } from 'react'
import { useParking } from '../hooks/useParking'
import { useAuth } from '../context/AuthContext'
import { useUserBookings } from '../hooks/useUserBookings'

const Bookings = () => {
  const { data, fetchUserData } = useParking()
  const { loggedIn } = useAuth()
  
  const refresh = () => {
    if (loggedIn) fetchUserData()
  }

  const { cancel } = useUserBookings(refresh)

  useEffect(() => {
    refresh()
  }, [loggedIn])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">My Bookings</h2>
        <span className="bg-slate-200/50 px-3 py-1 rounded-full text-xs font-bold text-slate-500">{data.myBookings.length} total</span>
      </div>
      
      {data.myBookings.length === 0 ? (
        <div className="text-center bg-white rounded-2xl border border-slate-200 shadow-sm p-16">
          <p className="text-slate-500 font-medium text-lg">No bookings yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.myBookings.map((b: any, i: number) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Booking ID</p>
                  <p className="font-mono text-xs font-semibold text-slate-600">{b._id?.slice(-8).toUpperCase()}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  b.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {b.status}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Space <span className="text-amber-500">{b.slotId?.slotnumber || '—'}</span>
                </p>
              </div>
              {b.status === 'active' && (
                <button 
                  onClick={() => cancel(b._id)} 
                  className="mt-auto w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings
