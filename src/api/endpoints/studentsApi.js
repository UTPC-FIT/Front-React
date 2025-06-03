// @api/endpoints/studentsApi.js
import { apiClient } from '@api/client';

export function getStudents() {
    return apiClient.get(`/bienestar/users/role/student`);
}

export function getInscriptionInfoByStudentId(studentId) {
    return apiClient.get(`/inscription/students/${studentId}`)
}

export function getStudentById(studentId) {
    return apiClient.get(`/bienestar/users/${studentId}`)
}

export function putChangeStatusStudent({ studentId, newStatus }) {
    return apiClient.put(`/bienestar/users/${studentId}/status`, {
        status: newStatus
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
}

export function getConsentPdfByStudentId(studentId) {
    return apiClient.get(`/inscription/consent/${studentId}`, {
        responseType: 'blob'
    });
}