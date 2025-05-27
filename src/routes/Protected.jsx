import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function Protected({ children }) {
    const { user, loading, authenticated } = useAuth();
    const location = useLocation();

    console.log('Protected component - state:', {
        hasUser: !!user,
        loading,
        authenticated,
        pathname: location.pathname,
        username: user?.username
    });

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--color-neutral-gray-medium)]">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!authenticated || !user) {
        console.log('Protected: Redirecting to login - not authenticated');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    console.log('Protected: Rendering protected content for user:', user.username);
    // Render protected content
    return <>{children}</>;
}