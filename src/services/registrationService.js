// src/services/registrationService.js
import * as api from '@/api/endpoints/registrationApi';
import { toRegistrationFormData } from '@/dtos/registrationDto';
import { ApiError } from '@/utils/ApiError';

export async function registerStudent(registrationData) {
    const formData = toRegistrationFormData(registrationData);

    try {
        const response = await api.postStudentRegistration(formData);
        return response.data;
    } catch (err) {
        // Axios error
        if (err.response) {
            const { status, data } = err.response;
            throw new ApiError(data.message || 'Error en la petición', status, data);
        }
        throw new ApiError(err.message, err.code || 500);
    }
}

export async function changeStatusToPending(idStudent) {
    try {
        const response = await api.putChangeStatusToPending(idStudent);
        return response.data;
    } catch (err) {
        throw new ApiError(err.message, err.code || 500)
    }
}
