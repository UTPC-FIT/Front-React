import { apiClient } from '@api/client';

/**
 * @param {FormData} formData 
 */
export function postStudentRegistration(formData) {
    return apiClient.post('/inscription/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export function putChangeStatusToPending(id_student) {
    return apiClient.put(`/bienestar/users/${id_student}/status`, {
        status: "pending"
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
}
