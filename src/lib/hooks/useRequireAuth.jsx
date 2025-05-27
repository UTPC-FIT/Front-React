import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';


export function useRequireAuth() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', {
                state: { from: location },
                replace: true
            });
        }
    }, [user, loading, navigate, location]);

    return { user, loading, isAuthenticated: !!user };
}