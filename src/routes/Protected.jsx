// src/routes/Protected.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/hooks/useAuth' // tu hook de auth

export default function Protected({ children }) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <>{children}</>
}
