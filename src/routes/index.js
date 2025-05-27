import { lazy } from 'react';
import Protected from '@routes/Protected';

const HomePage = lazy(() => import('@pages/Home/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'));
const InscriptionPage = lazy(() => import('@pages/Inscription/InscriptionPage'));
const LoginPage = lazy(() => import('@pages/Login/LoginPage'));
const CallbackPage = lazy(() => import('@pages/Callback/CallbackPage'));

export const routes = [
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/callback', Component: CallbackPage },
    { path: '/inscripcion', Component: InscriptionPage, Protected: Protected },
    { path: '*', Component: NotFoundPage }
];