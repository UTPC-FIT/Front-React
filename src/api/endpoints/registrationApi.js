import { apiClient } from '@api/client';

/**
 * @param {FormData} formData 
 */
export function postStudentRegistration(formData) {
    return apiClient.post('/students/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}
