// Mock user data for testing
const mockUser = () => ({
    id_student: Math.floor(Math.random() * 100000000).toString(),
    username: "student" + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
    name: "John Doe",
    email: "john.doe@uptc.edu.co",
    role: "student",
    age: 20
})

// Function to set mock user in localStorage
export async function setMockUser() {
    localStorage.setItem('user', JSON.stringify(mockUser()));
}

// lógica de ejemplo para manejar la autenticación - cambiar después con la implementación real
export async function getCurrentUser() {
    // Simulate small delay as if it were a real request
    await new Promise(res => setTimeout(res, 200));

    await setMockUser(); // Set mock user for testing

    let userJson = localStorage.getItem('user');

    if (!userJson) {
        console.warn('No user found in localStorage');
        return null;
    }

    if (userJson) {
        try {
            return JSON.parse(userJson);
        } catch {
            console.warn('Error parsing user JSON from localStorage');
            return null;
        }
    }
    return null;
}
