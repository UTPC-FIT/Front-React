import { useState, useEffect } from 'react'
import { getCurrentUser } from '@store/auth'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then(userData => {
                setUser(userData)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    return {
        user,
        loading,
        id_student: user?.id_student,
        username: user?.username
    }
}