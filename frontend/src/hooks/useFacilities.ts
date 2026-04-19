import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api'

export const useFacilities = (refreshCallback: () => void) => {
  const { authHeaders } = useAuth()
  const [showAdd, setShowAdd] = useState(false)
  const [editLot, setEditLot] = useState<any>(null)

  const create = async (data: any) => {
    try {
      const h = authHeaders()
      if (!h) return
      const res = await fetch(`${API}/parkinglot`, {
        method: 'POST', headers: h, body: JSON.stringify(data)
      })
      if (res.ok) {
        setShowAdd(false)
        refreshCallback()
      }
    } catch (e) { console.error(e) }
  }

  const update = async (id: string, data: any) => {
    try {
      const h = authHeaders()
      if (!h) return
      const res = await fetch(`${API}/parkinglot/${id}`, {
        method: 'PUT', headers: h, body: JSON.stringify(data)
      })
      if (res.ok) {
        setEditLot(null)
        refreshCallback()
      }
    } catch (e) { console.error(e) }
  }

  const remove = async (id: string) => {
    try {
      const h = authHeaders()
      if (!h) return
      const res = await fetch(`${API}/parkinglot/${id}`, { method: 'DELETE', headers: h })
      if (res.ok) {
        setEditLot(null)
        refreshCallback()
      }
    } catch (e) { console.error(e) }
  }

  return { showAdd, setShowAdd, editLot, setEditLot, create, update, remove }
}
