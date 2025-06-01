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
        return keycloakInstance.login({ redirectUri: `${window.location.origin}/inscription` });
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
    if (keycloakInstance?.authenticated) {
        const userInfo = {
            id_student: keycloakInstance.tokenParsed?.sub,
            username: keycloakInstance.tokenParsed?.preferred_username,
            email: keycloakInstance.tokenParsed?.email,
            roles: keycloakInstance.tokenParsed?.realm_access?.roles || [],
        };
        return userInfo;
    }
    return null;
};