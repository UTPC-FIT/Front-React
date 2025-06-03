import * as api from '@/api/endpoints/studentsApi';
import { ApiError } from '@/utils/ApiError';
import { studentsDto, studentInscriptionInfoDto, studentDto } from '@/dtos/studentsDto';

export async function getStudents() {
    try {
        const response = await api.getStudents();
        return studentsDto(response.data);
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            throw new ApiError(data.message || 'Error en la petición', status, data);
        }
        throw new ApiError(err.message, err.code || 500);
    }
}

export async function getStudentInscriptionInfoById(studentId) {
    try {
        const response = await api.getInscriptionInfoByStudentId(studentId);
        return studentInscriptionInfoDto(response.data);
    } catch (err) {
        if (err.response && err.response.status === 404) {
            // Return default structure when no inscription info is found
            return studentInscriptionInfoDto(null);
        }
        if (err.response) {
            const { status, data } = err.response;
            throw new ApiError(data.message || 'Error en la petición', status, data);
        }
        throw new ApiError(err.message, err.code || 500);
    }
}

export async function getStudentById(studentId) {
    try {
        const response = await api.getStudentById(studentId);
        console.log("HALDLDL", response.data)
        const student = studentDto(response.data);
        return student;
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            throw new ApiError(data.message || 'Error en la petición', status, data);
        }
        throw new ApiError(err.message, err.code || 500);
    }
}

export async function changeStatusStudent({ studentId, newStatus }) {
    try {
        const validStatus = ["inactive", "active", "pending", "unregister"];
        if (!validStatus.some(status => status === newStatus)) {
            throw new ApiError("The status is not valid")
        }

        const response = await api.putChangeStatusStudent({ studentId, newStatus });
        return response.data;
    } catch (err) {
        throw new ApiError(err.message, err.code || 500)
    }
}