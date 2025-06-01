import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function Protected({ children, allowedRoles = [], forbiddenRoles = [] }) {
    const { user, loading, authenticated } = useAuth();
    const location = useLocation();

    console.log('Protected component - state:', {
        hasUser: !!user,
        loading,
        authenticated,
        pathname: location.pathname,
        username: user?.username,
        userRoles: user?.roles,
        allowedRoles,
        forbiddenRoles
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

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 || forbiddenRoles.length > 0) {
        const userRoles = user.roles || [];

        // Check forbidden roles first (blacklist)
        if (forbiddenRoles.length > 0) {
            const hasForbiddenRole = forbiddenRoles.some(role => userRoles.includes(role));

            if (hasForbiddenRole) {
                console.log('Protected: Access denied - user has forbidden role', {
                    userRoles,
                    forbiddenRoles,
                    forbiddenRoleFound: forbiddenRoles.filter(role => userRoles.includes(role))
                });

                // Redirect based on user's primary role
                if (userRoles.includes('student')) {
                    return <Navigate to="/" replace />;
                } else if (userRoles.includes('official')) {
                    return <Navigate to="/officials" replace />;
                } else {
                    return <Navigate to="/login" replace />;
                }
            }
        }

        // Check allowed roles (whitelist) - only if allowedRoles is specified
        if (allowedRoles.length > 0) {
            const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));

            if (!hasRequiredRole) {
                console.log('Protected: Access denied - insufficient permissions', {
                    userRoles,
                    allowedRoles
                });

                // Redirect based on user's primary role
                if (userRoles.includes('student')) {
                    return <Navigate to="/" replace />;
                } else if (userRoles.includes('official')) {
                    return <Navigate to="/officials" replace />;
                } else {
                    // Fallback to login if no recognized role
                    return <Navigate to="/login" replace />;
                }
            }
        }
    }

    console.log('Protected: Rendering protected content for user:', user.username);
    return <>{children}</>;
}