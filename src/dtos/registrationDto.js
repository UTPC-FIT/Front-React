/**
 * @param {{
*   consent_document: File|null,
*   parental_authorization: File|null,
*   emergency_contact_name: string,
*   emergency_contact_phone: string,
*   emergency_contact_relationship: string,
*   username: string,
*   id_student: string|number
* }} data 
*/
export function toRegistrationFormData(data) {
    const fd = new FormData();

    if (data.consent_document) {
        fd.append('file', data.consent_document);
    }
    if (data.parental_authorization) {
        fd.append('parentalAuthorization', data.parental_authorization);
    }

    // Emergencies en un array JSON
    const emergency = [{
        name: data.emergency_contact_name,
        number_contact: data.emergency_contact_phone,
        relationship: data.emergency_contact_relationship
    }];
    fd.append('emergency_contacts', JSON.stringify(emergency));

    fd.append('username', data.username);
    fd.append('id_student', data.id_student.toString());

    return fd;
}
