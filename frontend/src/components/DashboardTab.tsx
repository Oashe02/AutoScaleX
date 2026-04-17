const DashboardTab = ({
  loggedIn,
  totalSpaces,
  occupancyRate,
  activeBookingsCount,
  lots,
  filteredLots,
  loading,
  error,
  setShowAddFacility,
  setNotification,
  openBookModal
}: any) => {
  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 mb-8 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex-1 pr-0 md:pr-6">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-3">Space <span className="text-amber-400">Available.</span></h1>
          <p className="text-sm lg:text-base text-slate-400 max-w-xl">Find available space, secure your reservation, and park completely hassle-free.</p>
        </div>
        <div className="mt-6 md:mt-0 relative z-10 shrink-0">
          <button 
             onClick={() => {
                if (!loggedIn) { setNotification({ title: 'Authentication Required', message: 'Please Sign In to add parking facilities.'}); return }
                setShowAddFacility(true)
             }}
            className="px-6 lg:px-8 py-3 lg:py-4 rounded-xl bg-amber-400 text-slate-900 font-black tracking-wide hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] active:scale-95 cursor-pointer flex items-center gap-2 text-sm lg:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
            New Facility
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[20px] p-5 lg:p-6 shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 relative z-10">Total Spaces</p>
          <p className="text-3xl lg:text-4xl font-black relative z-10">{totalSpaces}</p>
        </div>
        <div className="bg-white border-2 border-slate-100 rounded-[20px] p-5 lg:p-6 shadow-sm hover:shadow-md hover:border-amber-200 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start mb-1.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Occupancy</p>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          </div>
          <p className="text-3xl lg:text-4xl font-black text-slate-900">{occupancyRate}<span className="text-lg font-bold text-slate-300 ml-1">%</span></p>
        </div>
        <div className="bg-white border-2 border-slate-100 rounded-[20px] p-5 lg:p-6 shadow-sm hover:shadow-md hover:border-emerald-200 hover:-translate-y-1 transition-all">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">My Bookings</p>
          <p className="text-3xl lg:text-4xl font-black text-emerald-600">{activeBookingsCount}</p>
        </div>
        <div className="bg-amber-400 rounded-[20px] p-5 lg:p-6 shadow-md shadow-amber-400/20 hover:-translate-y-1 transition-transform text-slate-900">
          <p className="text-xs font-bold text-amber-900/60 uppercase tracking-widest mb-1.5">Facilities</p>
          <p className="text-3xl lg:text-4xl font-black">{lots.length}</p>
        </div>
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">Active Zones</h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-full">{filteredLots.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin mb-4" />
          <p className="font-medium">Syncing live parking data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-6 px-6 bg-red-50 border border-red-200 text-red-600 rounded-2xl max-w-md mx-auto font-medium shadow-sm">
          {error}
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredLots.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">P</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No facilities found.</h3>
              <p className="text-slate-500 max-w-sm mx-auto">No parking lots matching your search criteria.</p>
            </div>
          ) : (
            filteredLots.map((lot: any, idx: number) => {
              const safeAvailable = Math.min(lot.availableSlots ?? 0, lot.totalSlots ?? 0)
              const occupiedCount = (lot.totalSlots ?? 0) - safeAvailable
              const pct = lot.totalSlots > 0 ? Math.round((safeAvailable / lot.totalSlots) * 100) : 0
              return (
                <div 
                  key={idx} 
                  onClick={() => openBookModal(lot)}
                  className="bg-white border border-slate-200 shadow-sm rounded-2xl hover:-translate-y-0.5 hover:shadow-xl hover:border-slate-300 cursor-pointer transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                  <div className="h-36 overflow-hidden relative">
                    <img src="/parking-hero.png" alt="Parking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${safeAvailable > 0 ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'}`}>
                        {safeAvailable > 0 ? `${safeAvailable} Open` : 'FULL'}
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="bg-amber-400/90 backdrop-blur-md text-slate-900 px-2.5 py-1 rounded-full text-[10px] font-black">₹50/hr</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-0.5">{lot.name || "Unnamed Lot"}</h3>
                    <p className="text-xs font-medium text-slate-500 mb-4 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {lot.location || "Location not set"}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center bg-slate-50 rounded-lg py-2">
                        <p className="text-lg font-black text-slate-900">{lot.totalSlots}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Total</p>
                      </div>
                      <div className="text-center bg-emerald-50 rounded-lg py-2">
                        <p className="text-lg font-black text-emerald-600">{safeAvailable}</p>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase">Open</p>
                      </div>
                      <div className="text-center bg-rose-50 rounded-lg py-2">
                        <p className="text-lg font-black text-rose-500">{occupiedCount}</p>
                        <p className="text-[9px] font-bold text-rose-400 uppercase">Taken</p>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${pct > 50 ? 'bg-emerald-500' : pct > 20 ? 'bg-amber-400' : 'bg-rose-500'}`} 
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="w-full text-center py-3 rounded-xl bg-slate-900 text-white font-bold text-sm group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors duration-300 mt-auto">
                      Book Parking Spot
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </section>
      )}
    </>
  )
}


export default DashboardTab