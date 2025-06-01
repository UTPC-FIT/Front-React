import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginTemplate from '@templates/LoginTemplate';
import { login } from '@services/authService';
import { useAuth } from '@context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (!authLoading && user) {
            console.log('LoginPage: Usuario ya autenticado, redirigiendo a:', from);
            navigate(from, { replace: true });
        }
    }, [user, authLoading, from, navigate]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log('LoginPage: Intentando hacer login...');
            await login();
        } catch (error) {
            console.error('LoginPage: Login error:', error);
            toast.error('Error al intentar iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--color-neutral-gray-medium)]">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return null;
    }

    return <LoginTemplate onLogin={handleLogin} loading={loading} />;
};

export default LoginPage;