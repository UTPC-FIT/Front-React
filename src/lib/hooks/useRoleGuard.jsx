import { useAuth } from '@context/AuthContext';

/**
 * Hook para verificar permisos de rol en componentes
 * @param {string|string[]} requiredRoles - Rol o roles requeridos (whitelist)
 * @param {string|string[]} forbiddenRoles - Rol o roles prohibidos (blacklist)
 * @returns {object} - Estado de autorización y información del usuario
 */
export function useRoleGuard(requiredRoles = [], forbiddenRoles = []) {
    const { user, loading, authenticated } = useAuth();

    // Normalizar a array si se pasa un string
    const allowedArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    const forbiddenArray = Array.isArray(forbiddenRoles) ? forbiddenRoles : [forbiddenRoles];

    // Verificar si el usuario tiene algún rol prohibido
    const hasForbiddenRole = () => {
        if (!user || !user.roles || forbiddenArray.length === 0) {
            return false;
        }

        return forbiddenArray.some(role => user.roles.includes(role));
    };

    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasRequiredRole = () => {
        if (!user || !user.roles || allowedArray.length === 0) {
            return true; // Si no hay roles requeridos, se permite el acceso
        }

        return allowedArray.some(role => user.roles.includes(role));
    };

    // Determinar el rol principal del usuario para redirecciones
    const getPrimaryRole = () => {
        if (!user || !user.roles) return null;

        if (user.roles.includes('official')) return 'official';
        if (user.roles.includes('student')) return 'student';
        return null;
    };

    // Obtener la ruta por defecto según el rol
    const getDefaultRoute = () => {
        const primaryRole = getPrimaryRole();
        switch (primaryRole) {
            case 'official':
                return '/officials';
            case 'student':
                return '/';
            default:
                return '/login';
        }
    };

    return {
        // Estados básicos
        user,
        loading,
        authenticated,

        // Verificaciones de rol
        hasRequiredRole: hasRequiredRole(),
        hasForbiddenRole: hasForbiddenRole(),
        isStudent: user?.roles?.includes('student') || false,
        isOfficial: user?.roles?.includes('official') || false,

        // Información de roles
        userRoles: user?.roles || [],
        primaryRole: getPrimaryRole(),

        // Utilidades
        getDefaultRoute,

        // Verificación de acceso completa
        canAccess: authenticated && hasRequiredRole() && !hasForbiddenRole()
    };
}

/**
 * Hook simplificado para verificar si el usuario es estudiante
 */
export function useIsStudent() {
    const { isStudent, loading, authenticated } = useRoleGuard();
    return { isStudent: authenticated && isStudent, loading };
}

/**
 * Hook simplificado para verificar si el usuario es oficial
 */
export function useIsOfficial() {
    const { isOfficial, loading, authenticated } = useRoleGuard();
    return { isOfficial: authenticated && isOfficial, loading };
}