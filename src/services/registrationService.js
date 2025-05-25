import * as api from '@api/endpoints/registrationApi';
import { toRegistrationFormData } from '@dtos/registrationDto';

/**
 * @param {Object} registrationData
 */
export async function registerStudent(registrationData) {
    const formData = toRegistrationFormData(registrationData);
    const response = await api.postStudentRegistration(formData);
    return response.data;
}
