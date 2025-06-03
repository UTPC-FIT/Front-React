import React, { useMemo } from 'react';
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

    // Memoizar la lógica de redirección para evitar recálculos innecesarios
    const redirectInfo = useMemo(() => {
        // Si está cargando, no determinar redirección aún
        if (loading) {
            return { shouldRedirect: false, redirectTo: null };
        }

        // Si no está autenticado, ir a login
        if (!authenticated || !user) {
            return { shouldRedirect: true, redirectTo: '/login' };
        }

        const userStatus = user.status;
        const userRoles = user.roles || [];
        const currentPath = location.pathname;

        console.log('Protected component - validation state:', {
            hasUser: !!user,
            authenticated,
            pathname: currentPath,
            username: user?.username,
            userRoles,
            userStatus,
            allowedRoles,
            forbiddenRoles,
            requiredStatus
        });

        // FUNCIÓN AUXILIAR: Determinar ruta por defecto según el rol del usuario
        const getDefaultRouteByRole = () => {
            if (userRoles.includes('official')) {
                return '/officials';
            } else if (userRoles.includes('student')) {
                return '/';
            }
            return '/';
        };

        // VALIDACIÓN DE STATUS - Prioridad sobre validación de roles
        if (userStatus) {
            // Si se require un status específico para esta ruta
            if (requiredStatus && userStatus !== requiredStatus) {
                // Solo redirigir si no estamos ya en la ruta correcta para nuestro status
                switch (userStatus) {
                    case 'unregistered':
                        if (currentPath !== '/inscription') {
                            return { shouldRedirect: true, redirectTo: '/inscription' };
                        }
                        break;
                    case 'pending':
                        if (currentPath !== '/pending') {
                            return { shouldRedirect: true, redirectTo: '/pending' };
                        }
                        break;
                    case 'inactive':
                        if (currentPath !== '/inactive') {
                            return { shouldRedirect: true, redirectTo: '/inactive' };
                        }
                        break;
                    case 'active':
                        // Usuario activo pero la ruta requiere otro status
                        // Redirigir a su página por defecto
                        const defaultRoute = getDefaultRouteByRole();
                        if (currentPath !== defaultRoute) {
                            return { shouldRedirect: true, redirectTo: defaultRoute };
                        }
                        break;
                    default:
                        return { shouldRedirect: true, redirectTo: '/login' };
                }
            }

            // Si no hay requiredStatus pero el usuario no es activo
            if (!requiredStatus && userStatus !== 'active') {
                let targetRoute;
                switch (userStatus) {
                    case 'unregistered':
                        targetRoute = '/inscription';
                        break;
                    case 'pending':
                        targetRoute = '/pending';
                        break;
                    case 'inactive':
                        targetRoute = '/inactive';
                        break;
                    default:
                        targetRoute = '/login';
                }

                // Solo redirigir si no estamos ya en la ruta correcta
                if (currentPath !== targetRoute) {
                    return { shouldRedirect: true, redirectTo: targetRoute };
                }
            }

            // Si el usuario es activo pero está intentando acceder a páginas de status específico
            if (userStatus === 'active' && requiredStatus && requiredStatus !== 'active') {
                const defaultRoute = getDefaultRouteByRole();
                if (currentPath !== defaultRoute) {
                    return { shouldRedirect: true, redirectTo: defaultRoute };
                }
            }
        }

        // VALIDACIÓN DE ROLES - Solo para usuarios activos o cuando no hay requirement de status
        if ((userStatus === 'active' || !requiredStatus) && (allowedRoles.length > 0 || forbiddenRoles.length > 0)) {

            // Verificar roles prohibidos primero (blacklist)
            if (forbiddenRoles.length > 0) {
                const hasForbiddenRole = forbiddenRoles.some(role => userRoles.includes(role));

                if (hasForbiddenRole) {
                    const defaultRoute = getDefaultRouteByRole();
                    if (currentPath !== defaultRoute) {
                        return { shouldRedirect: true, redirectTo: defaultRoute };
                    }
                }
            }

            // Verificar roles permitidos (whitelist)
            if (allowedRoles.length > 0) {
                const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));

                if (!hasRequiredRole) {
                    const defaultRoute = getDefaultRouteByRole();
                    if (currentPath !== defaultRoute) {
                        return { shouldRedirect: true, redirectTo: defaultRoute };
                    }
                }
            }
        }

        // No necesita redirección
        return { shouldRedirect: false, redirectTo: null };

    }, [loading, authenticated, user, location.pathname, allowedRoles, forbiddenRoles, requiredStatus]);

    // Mostrar loading mientras se verifica la autenticación
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

    // Realizar redirección si es necesario
    if (redirectInfo.shouldRedirect) {
        console.log('Protected: Redirecting to:', redirectInfo.redirectTo);
        return <Navigate to={redirectInfo.redirectTo} state={{ from: location }} replace />;
    }

    // Renderizar contenido protegido
    console.log('Protected: Rendering protected content for user:', user?.username);
    return <>{children}</>;
}