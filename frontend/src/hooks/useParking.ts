import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api'

export const useParking = () => {
  const { authHeaders, loggedIn } = useAuth()
  const [data, setData] = useState({
    lots: [] as any[],
    myBookings: [] as any[],
    myInvoices: [] as any[],
    availableSlots: [] as any[]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchLots = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/parkinglot`)
      if (res.ok) {
        const json = await res.json()
        setData(p => ({ ...p, lots: json }))
      }
    } catch (e) { setError('Connection error') }
    finally { setLoading(false) }
  }, [])

  const fetchUserData = useCallback(async () => {
    if (!loggedIn) return
    try {
      const h = authHeaders()
      if (!h) return
      const bkRes = await fetch(`${API}/booking/my`, { headers: h })
      const invRes = await fetch(`${API}/invoice/my`, { headers: h })
      
      if (bkRes.status === 401 || invRes.status === 401) {
        console.warn('Auth failed, redirecting...', { bk: bkRes.status, inv: invRes.status })
        localStorage.removeItem('token')
        window.location.href = '/landing'
        return
      }

      const bk = bkRes.ok ? await bkRes.json() : []
      const inv = invRes.ok ? await invRes.json() : []

      setData(p => ({ ...p, myBookings: bk, myInvoices: inv }))
    } catch (e) {
      console.error('Fetch user data failed:', e)
    }
  }, [loggedIn, authHeaders])

  return { data, loading, error, fetchLots, fetchUserData, setData }
}
