import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api'

export const useUserBookings = (refreshCallback: () => void) => {
  const { authHeaders } = useAuth()

  const cancel = async (id: string) => {
    try {
      const h = authHeaders()
      if (!h) return
      const res = await fetch(`${API}/booking/cancel/${id}`, { method: 'PUT', headers: h })
      if (res.ok) refreshCallback()
    } catch (e) { console.error(e) }
  }

  return { cancel }
}
