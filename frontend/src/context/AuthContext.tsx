import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  loggedIn: boolean
  login: (token: string) => void
  logout: () => void
  authHeaders: () => { 'Content-Type': string, 'Authorization': string } | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  const authHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : null
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
