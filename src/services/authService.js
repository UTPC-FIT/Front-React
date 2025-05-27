import Keycloak from 'keycloak-js';

const keycloakOptions = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

let keycloakInstance = null;

export const initKeycloak = async () => {
    console.log('initKeycloak called, keycloakInstance:', keycloakInstance);
    console.log('Keycloak options:', keycloakOptions);

    if (!keycloakInstance) {
        console.log('Creating new Keycloak instance...');
        keycloakInstance = new Keycloak(keycloakOptions);

        try {
            console.log('Initializing Keycloak...');
            const authenticated = await keycloakInstance.init({
                onLoad: 'check-sso',
                checkLoginIframe: false
            });

            console.log('Keycloak initialized, authenticated:', authenticated);
            return { keycloak: keycloakInstance, authenticated };
        } catch (error) {
            console.error('Keycloak initialization failed', error);
            return { keycloak: keycloakInstance, authenticated: false };
        }
    }

    console.log('Using existing keycloak instance, authenticated:', keycloakInstance.authenticated);
    return { keycloak: keycloakInstance, authenticated: keycloakInstance.authenticated };
};

export const getKeycloak = () => keycloakInstance;

export const login = async () => {
    if (!keycloakInstance) {
        await initKeycloak();
    }

    if (keycloakInstance) {
        // Sin especificar redirectUri, usará la URL actual
        return keycloakInstance.login();
    } else {
        throw new Error('Keycloak no pudo ser inicializado');
    }
};

export const logout = () => {
    if (keycloakInstance) {
        keycloakInstance.logout();
    }
};

export const getToken = () => {
    return keycloakInstance?.token;
};

export const getUserInfo = () => {
    console.log('getUserInfo called - keycloakInstance:', keycloakInstance);
    console.log('keycloakInstance.authenticated:', keycloakInstance?.authenticated);
    console.log('keycloakInstance.tokenParsed:', keycloakInstance?.tokenParsed);

    if (keycloakInstance?.authenticated) {
        const userInfo = {
            id_student: keycloakInstance.tokenParsed?.sub,
            username: keycloakInstance.tokenParsed?.preferred_username,
            name: keycloakInstance.tokenParsed?.name,
            email: keycloakInstance.tokenParsed?.email,
            role: keycloakInstance.tokenParsed?.realm_access?.roles || [],
            age: keycloakInstance.tokenParsed?.age || 20
        };
        console.log('Returning user info:', userInfo);
        return userInfo;
    }
    console.log('No authenticated user found');
    return null;
};