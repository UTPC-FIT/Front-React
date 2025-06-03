import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export default function Protected({
    children,
    allowedRoles = [],
    forbiddenRoles = [],
    requiredStatus = null
}) {
    const { user, loading, authenticated } = useAuth();
    const location = useLocation();

    console.log('Protected component - state:', {
        hasUser: !!user,
        loading,
        authenticated,
        pathname: location.pathname,
        username: user?.username,
        userRoles: user?.roles,
        userStatus: user?.status,
        allowedRoles,
        forbiddenRoles,
        requiredStatus
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

    // Get user status
    const userStatus = user.status;

    // STATUS VALIDATION - Priority over role validation
    if (userStatus) {
        // If user has a specific status requirement for this route
        if (requiredStatus && userStatus !== requiredStatus) {
            console.log('Protected: Status mismatch - redirecting based on user status', {
                userStatus,
                requiredStatus
            });

            // Redirect based on user's actual status
            switch (userStatus) {
                case 'unregistered':
                    if (location.pathname !== '/inscription') {
                        return <Navigate to="/inscription" replace />;
                    }
                    break;
                case 'pending':
                    if (location.pathname !== '/pending') {
                        return <Navigate to="/pending" replace />;
                    }
                    break;
                case 'inactive':
                    if (location.pathname !== '/inactive') {
                        return <Navigate to="/inactive" replace />;
                    }
                    break;
                case 'active':
                    // For active users, continue with role validation
                    break;
                default:
                    // Unknown status, redirect to login
                    return <Navigate to="/login" replace />;
            }
        }

        // If user is not active and trying to access a route without specific status requirement
        if (!requiredStatus && userStatus !== 'active') {
            console.log('Protected: Non-active user trying to access active-only route', {
                userStatus,
                pathname: location.pathname
            });

            // Redirect based on user's status
            switch (userStatus) {
                case 'unregistered':
                    return <Navigate to="/inscription" replace />;
                case 'pending':
                    return <Navigate to="/pending" replace />;
                case 'inactive':
                    return <Navigate to="/inactive" replace />;
                default:
                    return <Navigate to="/login" replace />;
            }
        }

        // If user is active but trying to access status-specific pages
        if (userStatus === 'active' && requiredStatus && requiredStatus !== 'active') {
            console.log('Protected: Active user trying to access status-specific page', {
                userStatus,
                requiredStatus,
                pathname: location.pathname
            });

            // Redirect active user to appropriate page based on their role
            const userRoles = user.roles || [];
            if (userRoles.includes('student')) {
                return <Navigate to="/" replace />;
            } else if (userRoles.includes('official')) {
                return <Navigate to="/officials" replace />;
            } else {
                return <Navigate to="/" replace />;
            }
        }
    }

    // ROLE VALIDATION - Only for active users or when no status requirement
    if ((userStatus === 'active' || !requiredStatus) && (allowedRoles.length > 0 || forbiddenRoles.length > 0)) {
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