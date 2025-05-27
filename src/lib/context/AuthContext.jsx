import React, { createContext, useContext, useState, useEffect } from 'react';
import { initKeycloak, getUserInfo, logout as keycloakLogout } from '@services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [keycloak, setKeycloak] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                console.log('AuthProvider: Inicializando autenticación...');
                const { keycloak: kcInstance, authenticated } = await initKeycloak();
                setKeycloak(kcInstance);

                console.log('AuthProvider: Auth result:', { authenticated });

                if (authenticated) {
                    const userData = getUserInfo();
                    console.log('AuthProvider: User data:', userData);
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('AuthProvider: Error en inicialización:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const logout = () => {
        console.log('AuthProvider: Logging out...');
        setUser(null);
        keycloakLogout();
    };

    const refreshUser = async () => {
        try {
            setLoading(true);
            const { authenticated } = await initKeycloak();

            if (authenticated) {
                const userData = getUserInfo();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('AuthProvider: Error refreshing user:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        keycloak,
        logout,
        refreshUser,
        authenticated: !!user,
        id_student: user?.id_student,
        username: user?.username
    };

    console.log('AuthProvider: Current state:', { user: !!user, loading, authenticated: !!user });

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};