import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api'

export const useBooking = (refreshCallback: () => void) => {
  const { authHeaders } = useAuth()
  
  const [state, setState] = useState({
    selectedLot: null as any,
    availableSlots: [] as any[],
    loading: false,
    paymentOpen: false,
    pendingSlot: null as any,
    pendingLotName: '',
    bookingSuccess: false,
    confirmedSlotNumber: ''
  })

  const openLot = useCallback(async (lot: any) => {
    setState(s => ({ ...s, selectedLot: lot, loading: true, bookingSuccess: false }))
    try {
      const res = await fetch(`${API}/slot/lot/${lot._id}`)
      if (res.ok) {
        const slots = await res.json()
        setState(s => ({ ...s, availableSlots: slots, loading: false }))
      }
    } catch (e) { 
      setState(s => ({ ...s, loading: false }))
    }
  }, [])

  const closeLot = () => setState(s => ({ ...s, selectedLot: null, availableSlots: [] }))

  const selectSlot = (slot: any) => {
    setState(s => ({ 
      ...s, 
      pendingSlot: slot, 
      pendingLotName: s.selectedLot?.name || 'Smart Facility',
      paymentOpen: true,
      selectedLot: null // close slot modal
    }))
  }

  const finalize = async (method: string) => {
    try {
      const h = authHeaders()
      if (!h) return

      const slotNum = state.pendingSlot.slotnumber

      const bRes = await fetch(`${API}/booking`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ slotId: state.pendingSlot._id })
      })
      
      if (bRes.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/landing'
        return
      }
      
      if (!bRes.ok) {
        const err = await bRes.json()
        throw new Error(err.error || 'Booking creation failed')
      }
      const booking = await bRes.json()

      const invRes = await fetch(`${API}/invoice`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ bookingId: booking._id, amount: 100 })
      })
      
      if (!invRes.ok) throw new Error('Invoice generation failed')
      const invoice = await invRes.json()

      const pRes = await fetch(`${API}/payment`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ invoiceId: invoice.inv._id, amount: 100, method })
      })

      if (!pRes.ok) throw new Error('Payment processing failed')

      setState(s => ({ 
        ...s, 
        paymentOpen: false, 
        pendingSlot: null, 
        bookingSuccess: true,
        confirmedSlotNumber: slotNum 
      }))
      refreshCallback()
    } catch (e: any) {
      console.error(e.message || 'Something went wrong')
    }
  }

  return { 
    state, 
    openLot, 
    closeLot, 
    selectSlot, 
    finalize, 
    setPaymentOpen: (v: boolean) => setState(s => ({...s, paymentOpen: v})),
    setSuccessOpen: (v: boolean) => setState(s => ({...s, bookingSuccess: v}))
  }
}
