
// lógica de ejemplo para manejar la autenticación - cambiar después con la implementación real
export async function getCurrentUser() {
    // Simulate small delay as if it were a real request
    await new Promise(res => setTimeout(res, 200));

    const userJson = localStorage.getItem('user');
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
