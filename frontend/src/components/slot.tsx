import React, { useState } from 'react'
const CarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="24" rx="4" opacity="0.85"/>
    <rect x="5" y="4" width="14" height="8" rx="3" opacity="0.6"/>
    <rect x="5" y="28" width="14" height="8" rx="3" opacity="0.6"/>
    <rect x="1" y="14" width="4" height="5" rx="1.5" opacity="0.5"/>
    <rect x="19" y="14" width="4" height="5" rx="1.5" opacity="0.5"/>
    <rect x="1" y="22" width="4" height="5" rx="1.5" opacity="0.5"/>
    <rect x="19" y="22" width="4" height="5" rx="1.5" opacity="0.5"/>
    <rect x="8" y="6" width="8" height="4" rx="1" fill="white" opacity="0.3"/>
    <rect x="8" y="30" width="8" height="4" rx="1" fill="white" opacity="0.3"/>
  </svg>
)
const typeColors: any = {
  car: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', label: '🚗 Car' },
  bike: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', label: '🏍️ Bike' },
  ev: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', label: '⚡ EV' },
}
export const SlotModal = ({ lot, slots, loading, onClose, onBook }: any) => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [filterType, setFilterType] = useState('all')
  const [duration, setDuration] = useState(2)
  if (!lot) return null
  const filteredSlots = filterType === 'all' ? slots : slots.filter((s: any) => s.type === filterType)
  const availableCount = slots.filter((s: any) => s.status === 'available').length
  const occupiedCount = slots.filter((s: any) => s.status !== 'available').length
  const handleConfirmBook = () => {
    if (selectedSlot) {
      onBook(selectedSlot)
      setSelectedSlot(null)
    }
  }
  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/70 backdrop-blur-sm flex items-stretch justify-end" onClick={onClose}>
      {}
      <div 
        className="w-full max-w-5xl bg-white shadow-2xl flex flex-col lg:flex-row h-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {}
        <div className="w-full lg:w-[380px] bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          {}
          <div className="relative h-44 lg:h-52 overflow-hidden shrink-0">
            <img src="/parking-hero.png" alt="Parking" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="absolute bottom-4 left-5 right-5">
              <h2 className="text-2xl font-black text-white tracking-tight">{lot.name}</h2>
              <p className="text-sm text-white/70 font-medium flex items-center gap-1.5 mt-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {lot.location}
              </p>
            </div>
          </div>

          {}
          <div className="p-5 flex flex-col gap-4 flex-1">
            {}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <p className="text-2xl font-black text-slate-900">{lot.totalSlots}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-emerald-200 text-center">
                <p className="text-2xl font-black text-emerald-600">{availableCount}</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Open</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-rose-200 text-center">
                <p className="text-2xl font-black text-rose-500">{occupiedCount}</p>
                <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mt-0.5">Taken</p>
              </div>
            </div>

            {}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {['CCTV', '24/7 Access', 'Covered', 'EV Charging', 'Security'].map(a => (
                  <span key={a} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">{a}</span>
                ))}
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">₹50 <span className="text-xs font-bold text-slate-400">/hr</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => setDuration(Math.max(1, duration - 1))} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 cursor-pointer">−</button>
                    <span className="text-lg font-black text-slate-900 w-12 text-center">{duration} hr</span>
                    <button onClick={() => setDuration(Math.min(12, duration + 1))} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 cursor-pointer">+</button>
                  </div>
                </div>
              </div>
            </div>

            {}
            {selectedSlot && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">Selected Space</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-black text-slate-900">Space {selectedSlot.slotnumber}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase">{selectedSlot.type} slot</p>
                  </div>
                  <p className="text-2xl font-black text-emerald-600">₹{(50 * duration).toFixed(0)}</p>
                </div>
              </div>
            )}

            {}
            <button
              onClick={handleConfirmBook}
              disabled={!selectedSlot}
              className={`w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all cursor-pointer mt-auto ${
                selectedSlot 
                  ? 'bg-amber-400 text-slate-900 hover:bg-amber-300 shadow-lg shadow-amber-400/20 active:scale-[0.98]' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {selectedSlot ? `Book Space ${selectedSlot.slotnumber} — ₹${(50 * duration).toFixed(0)}` : 'Select a parking space'}
            </button>
          </div>
        </div>

        {}
        <div className="flex-1 flex flex-col overflow-hidden">
          {}
          <div className="px-6 py-4 bg-white border-b border-slate-100 shrink-0 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pick Your Spot</h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{availableCount} spaces available • select one to proceed</p>
            </div>
            <div className="flex gap-1.5">
              {['all', 'car', 'bike', 'ev'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    filterType === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>

          {}
          <div className="px-6 py-3 flex items-center gap-5 text-xs font-bold text-slate-500 bg-slate-50/50 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></div> Available
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-rose-100 border border-rose-300"></div> Occupied
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></div> Selected
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div> Reserved
            </div>
          </div>

          {}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin mb-4" />
                <p className="font-medium text-sm">Loading parking spaces...</p>
              </div>
            ) : filteredSlots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="font-bold text-lg">No spaces found</p>
                <p className="text-sm mt-1">Try a different filter</p>
              </div>
            ) : (
              <>
                {}
                <div className="max-w-2xl mx-auto">
                  {}
                  <div className="flex items-center justify-center gap-2 mb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="px-3 py-1 bg-slate-100 rounded-full">↓ Entry</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>

                  {}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {}
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Lane A</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Lane B</div>

                    {filteredSlots.map((slot: any, idx: number) => {
                      const isAvailable = slot.status === 'available'
                      const isSelected = selectedSlot?._id === slot._id
                      const isReserved = slot.status === 'reserved'
                      const tc = typeColors[slot.type] || typeColors.car
                      return (
                        <button
                          key={slot._id || idx}
                          onClick={() => isAvailable && setSelectedSlot(isSelected ? null : slot)}
                          disabled={!isAvailable}
                          className={`relative rounded-xl border-2 p-3 transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/20 scale-[1.02]'
                              : isAvailable
                                ? 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-md'
                                : isReserved
                                  ? 'border-blue-200 bg-blue-50/50 cursor-not-allowed opacity-70'
                                  : 'border-rose-200 bg-rose-50/30 cursor-not-allowed opacity-70'
                          }`}
                        >
                          {}
                          <div className={`w-12 h-12 flex items-center justify-center rounded-xl shrink-0 ${
                            isSelected ? 'bg-amber-100' : isAvailable ? 'bg-emerald-50' : isReserved ? 'bg-blue-100' : 'bg-rose-100'
                          }`}>
                            {isAvailable ? (
                              <svg className={`w-6 h-6 ${isSelected ? 'text-amber-500' : 'text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            ) : (
                              <CarIcon className={`w-7 h-10 ${isReserved ? 'text-blue-400' : 'text-rose-400'}`} />
                            )}
                          </div>

                          {}
                          <div className="flex-1 text-left min-w-0">
                            <p className={`text-sm font-black ${isSelected ? 'text-amber-700' : isAvailable ? 'text-slate-900' : 'text-slate-400'}`}>
                              {slot.slotnumber}
                            </p>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${tc.text}`}>{slot.type}</span>
                          </div>

                          {}
                          <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                            isSelected ? 'bg-amber-400 text-amber-900' : 
                            isAvailable ? 'bg-emerald-100 text-emerald-600' : 
                            isReserved ? 'bg-blue-100 text-blue-600' :
                            'bg-rose-100 text-rose-600'
                          }`}>
                            {isSelected ? 'Selected' : slot.status}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const SuccessModal = ({ slotNumber, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col items-center p-8 text-center" 
        onClick={e => e.stopPropagation()}
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Booking Confirmed!</h2>
        <p className="text-slate-500 font-medium mb-8">
          Your space <span className="text-slate-900 font-bold">{slotNumber}</span> is reserved and ready for you.
        </p>

        <div className="w-full space-y-3">
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm tracking-wide hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
          >
            Got it, Thanks!
          </button>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Ticket details sent to your email
          </p>
        </div>
      </div>
    </div>
  )
}