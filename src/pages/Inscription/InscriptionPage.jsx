import React from 'react';
import { useRequireAuth } from '@hooks/useRequireAuth';
import InscriptionTemplate from '@templates/InscriptionTemplate';
// import InscriptionTemplate from '@templates/InscriptionTemplate';

import { getToken } from '@services/authService';

const InscriptionPage = () => {
    const { user, loading, isAuthenticated } = useRequireAuth();

    console.log(user)
    console.log(getToken());

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    return <InscriptionTemplate />;
};

export default InscriptionPage;