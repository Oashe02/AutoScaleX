import { useEffect } from 'react'
import DashboardTab from '../components/DashboardTab'
import { useParking } from '../hooks/useParking'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../hooks/useBooking'
import { SlotModal } from '../components/slot'
import { PaymentInvoice } from '../components/PaymentInvoice'

import { AddFacilityModal } from '../components/AddFacilityModal'
import { useFacilities } from '../hooks/useFacilities'

const Home = () => {
  const { loggedIn } = useAuth()
  const { data, loading, error, fetchLots, fetchUserData } = useParking()
  
  const refresh = () => {
    fetchLots()
    if (loggedIn) fetchUserData()
  }

  const { state: bState, openLot, closeLot, selectSlot, finalize, setPaymentOpen } = useBooking(refresh)
  const { showAdd, setShowAdd, create } = useFacilities(refresh)

  useEffect(() => {
    refresh()
  }, [loggedIn])

  const stats = {
    totalSpaces: data.lots.reduce((a, l) => a + (l.totalSlots || 0), 0),
    totalAvailable: data.lots.reduce((a, l) => a + Math.min(l.availableSlots || 0, l.totalSlots || 0), 0),
    myBookings: data.myBookings.filter((b: any) => b.status === 'active').length
  }

  const occupancyRate = stats.totalSpaces > 0 ? Math.round(((stats.totalSpaces - stats.totalAvailable) / stats.totalSpaces) * 100) : 0

  return (
    <>
      <DashboardTab 
        loggedIn={loggedIn}
        totalSpaces={stats.totalSpaces}
        occupancyRate={occupancyRate}
        activeBookingsCount={stats.myBookings}
        lots={data.lots}
        filteredLots={data.lots}
        loading={loading}
        error={error}
        setShowAddFacility={setShowAdd}
        setNotification={() => {}}
        openBookModal={openLot}
      />

      <SlotModal 
        lot={bState.selectedLot} 
        slots={bState.availableSlots} 
        loading={bState.loading} 
        onClose={closeLot} 
        onBook={selectSlot} 
      />

      {bState.paymentOpen && (
        <PaymentInvoice 
          amount={100} 
          slotDetails={{...bState.pendingSlot, lotName: bState.pendingLotName}} 
          onClose={() => setPaymentOpen(false)} 
          onPay={finalize} 
        />
      )}

      {showAdd && <AddFacilityModal onClose={() => setShowAdd(false)} onAdd={create} />}
    </>
  )
}

export default Home
