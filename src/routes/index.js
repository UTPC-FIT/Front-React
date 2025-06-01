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
    // Public routes
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/callback', Component: CallbackPage },

    // Student routes - require authentication and "student" role
    {
        path: '/inscription',
        Component: InscriptionPage,
        Protected: Protected,
        allowedRoles: ['student']
    },

    // Officials routes - require authentication and "official" role
    {
        path: '/officials',
        Component: OfficialsHomePage,
        Protected: Protected,
        allowedRoles: ['official']
    },

    // Examples with forbidden roles (blacklist)

    // Example: Page accessible to everyone EXCEPT officials
    // { 
    //     path: '/student-only-area', 
    //     Component: StudentOnlyArea, 
    //     Protected: Protected,
    //     forbiddenRoles: ['official']
    // },

    // Example: Page forbidden for specific roles but open to others
    // { 
    //     path: '/general-access', 
    //     Component: GeneralAccess, 
    //     Protected: Protected,
    //     forbiddenRoles: ['banned', 'suspended']
    // },

    // Example: Combining whitelist and blacklist
    // Page only for students, but not for suspended students
    // { 
    //     path: '/active-students-only', 
    //     Component: ActiveStudentsOnly, 
    //     Protected: Protected,
    //     allowedRoles: ['student'],
    //     forbiddenRoles: ['suspended', 'inactive']
    // },

    // Example: Admin area - only admins, no regular users
    // { 
    //     path: '/admin', 
    //     Component: AdminPanel, 
    //     Protected: Protected,
    //     allowedRoles: ['admin'],
    //     forbiddenRoles: ['student', 'official'] // Extra security
    // },

    // Catch-all route for 404 Not Found
    { path: '*', Component: NotFoundPage }
];