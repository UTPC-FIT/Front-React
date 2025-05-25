import { useState } from 'react';
import * as service from '@services/registrationService';
import { useAuth } from '@hooks/useAuth';

import { toast } from 'react-toastify';

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
            const message = 'No se ha podido obtener el id del estudiante o el nombre de usuario';
            toast.error(message)
            throw new Error(message);
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
            toast.success('Registro exitoso 🥳');
            return result;
        } catch (err) {
            if (err.name === 'ApiError') {
                // Muestra el mensaje que vino del servidor
                toast.error(err.message);
            } else {
                toast.error('Ocurrió un error inesperado');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, data };
}