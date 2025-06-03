export const studentsDto = (data) => {
    // Check if data exists and is an array with at least one element
    if (data.length === 0) {
        return [];
    }

    // Extract users array from the first element
    const { users = [] } = data;

    if (users.length > 0) {
        // Transform the users data into the desired format
        return users.map(user => ({
            studentId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            studentCode: user.attributes.code[0],
            email: user.email,
            status: user.attributes.status[0] || 'inactive'
        }));
    } else {
        return []
    }
};

export const studentDto = (data) => {
    // Check if user exists
    if (!data) {
        return null;
    }

    const { user = [] } = data;

    // Transform single user data into the desired format
    return {
        studentId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        studentCode: user.attributes.code[0],
        email: user.email,
        status: user.attributes.status[0] || 'inactive'
    };
};


export const studentInscriptionInfoDto = (data) => {
    // If no data or empty object, return default structure
    if (!data || Object.keys(data).length === 0) {
        return {
            emergencyContacts: [],
            consent: {
                approved: false,
                approvedAt: null,
                createdAt: null,
                fileUrl: null
            }
        };
    }

    return {
        emergencyContacts: (data.emergency_contacts || []).map(contact => ({
            name: contact.name,
            phoneNumber: contact.number_contact,
            relationship: contact.relationship
        })),
        consent: {
            approved: data.consent?.approved || false,
            approvedAt: data.consent?.approvedAt || null,
            createdAt: data.consent?.createdAt || null,
            fileUrl: data.consent?.locations?.api || null
        }
    };
};