import { lazy } from 'react';
import Protected from '@routes/Protected';

const HomePage = lazy(() => import('@pages/Home/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'));
const InscriptionPage = lazy(() => import('@pages/Inscription/InscriptionPage'));
const LoginPage = lazy(() => import('@pages/Login/LoginPage'));
const CallbackPage = lazy(() => import('@pages/Callback/CallbackPage'));

// Pages for role "officials"
const OfficialsHomePage = lazy(() => import('@pages/Officials/HomePage'));

export const routes = [
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/callback', Component: CallbackPage },
    { path: '/inscription', Component: InscriptionPage, Protected: Protected },

    // Officials routes
    { path: '/officials', Component: OfficialsHomePage, Protected: Protected, /*role: 'officials'*/ },

    // Catch-all route for 404 Not Found
    { path: '*', Component: NotFoundPage }
];