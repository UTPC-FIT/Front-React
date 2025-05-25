import { useState } from 'react';
import * as service from '@services/registrationService';
import { useAuth } from '@hooks/useAuth';

export function useRegistration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { id_student, username } = useAuth();

    /**
     * formData contains:
     * { consent_document, parental_authorization, emergency_contact_* }
     */
    const register = async (formData) => {
        if (!id_student || !username) {
            throw new Error('Usuario no autenticado');
        }

        const registrationData = {
            ...formData,
            id_student,
            username
        };

        setLoading(true);
        setError(null);
        try {
            const result = await service.registerStudent(registrationData);
            setData(result);
            return result;
        } catch (err) {
            setError(err.response?.data || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, data };
}