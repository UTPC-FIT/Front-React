import React from 'react';
import { useRequireAuth } from '@hooks/useRequireAuth';
import InscriptionTemplate from '@templates/InscriptionTemplate';

const InscriptionPage = () => {
    const { user, loading, isAuthenticated } = useRequireAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <InscriptionTemplate user={user} />;
};

export default InscriptionPage;