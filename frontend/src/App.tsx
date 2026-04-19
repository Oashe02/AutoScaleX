import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Layout } from './components/Layout'
import { LandingPage } from './components/LandingPage'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Facilities from './pages/Facilities'
import Invoices from './pages/Invoices'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { loggedIn } = useAuth()
  return loggedIn ? <>{children}</> : <Navigate to="/landing" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
            <Route path="/facilities" element={<PrivateRoute><Facilities /></PrivateRoute>} />
            <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}