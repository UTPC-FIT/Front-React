import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const CallbackPage = () => {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Refresh user data after successful login
                await refreshUser();
                // Redirect to home or intended page
                navigate('/', { replace: true });
            } catch (error) {
                console.error('Error handling callback:', error);
                navigate('/login', { replace: true });
            }
        };

        handleCallback();
    }, [navigate, refreshUser]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                <p className="text-[var(--color-neutral-gray-medium)]">Completando inicio de sesión...</p>
            </div>
        </div>
    );
};

export default CallbackPage;