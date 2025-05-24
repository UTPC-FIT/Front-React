import { useState, useEffect } from 'react'
import { getCurrentUser } from '@store/auth'

export function useAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])

    return { user }
}
