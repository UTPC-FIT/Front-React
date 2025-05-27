import { initKeycloak, getUserInfo } from '@services/authService';

export async function getCurrentUser() {
    try {
        const { authenticated } = await initKeycloak();
        console.log('getCurrentUser - authenticated:', authenticated);

        if (authenticated) {
            const userData = getUserInfo();
            console.log('getCurrentUser - userData:', userData);
            return userData;
        }
        return null;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export function clearUser() {
    console.log('User cleared');
}