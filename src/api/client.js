import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_INSCRIPTION_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
