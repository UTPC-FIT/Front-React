import { apiClient } from '@api/client';

/**
 * @param {FormData} formData 
 */
export function postStudentRegistration(formData) {
    return apiClient.post('/inscription/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}
