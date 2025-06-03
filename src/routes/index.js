import { lazy } from 'react';
import Protected from '@routes/Protected';

const HomePage = lazy(() => import('@pages/Home/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'));
const InscriptionPage = lazy(() => import('@pages/Inscription/InscriptionPage'));
const LoginPage = lazy(() => import('@pages/Login/LoginPage'));
const CallbackPage = lazy(() => import('@pages/Callback/CallbackPage'));

// Status pages
const PendingPage = lazy(() => import('@pages/Status/PendingPage'));
const InactivePage = lazy(() => import('@pages/Status/InactivePage'));

// Pages for role "officials"
const OfficialsHomePage = lazy(() => import('@pages/Officials/HomePage'));
const OfficialsStudentPage = lazy(() => import('@pages/Officials/StudentPage'));

export const routes = [
    // Public routes
    { path: '/', Component: HomePage },
    { path: '/login', Component: LoginPage },
    { path: '/callback', Component: CallbackPage },

    // Status-specific routes (protected by status validation)
    {
        path: '/inscription',
        Component: InscriptionPage,
        Protected: Protected,
        requiredStatus: 'unregister'
    },
    {
        path: '/pending',
        Component: PendingPage,
        Protected: Protected,
        requiredStatus: 'pending'
    },
    {
        path: '/inactive',
        Component: InactivePage,
        Protected: Protected,
        requiredStatus: 'inactive'
    },

    // Role-based routes (only for active users)
    {
        path: '/officials',
        Component: OfficialsHomePage,
        Protected: Protected,
        requiredStatus: 'active',
        allowedRoles: ['official']
    },
    {
        path: '/officials/student/:studentId',
        Component: OfficialsStudentPage,
        Protected: Protected,
        requiredStatus: 'active',
        allowedRoles: ['official']
    },

    // Examples with forbidden roles (blacklist) - only for active users
    // {
    //     path: '/student-only-area',
    //     Component: StudentOnlyArea,
    //     Protected: Protected,
    //     requiredStatus: 'active',
    //     forbiddenRoles: ['official']
    // },

    // Example: Page forbidden for specific roles but open to others
    // {
    //     path: '/general-access',
    //     Component: GeneralAccess,
    //     Protected: Protected,
    //     requiredStatus: 'active',
    //     forbiddenRoles: ['banned', 'suspended']
    // },

    // Example: Combining whitelist and blacklist
    // Page only for students, but not for suspended students
    // {
    //     path: '/active-students-only',
    //     Component: ActiveStudentsOnly,
    //     Protected: Protected,
    //     requiredStatus: 'active',
    //     allowedRoles: ['student'],
    //     forbiddenRoles: ['suspended', 'inactive']
    // },

    // Example: Admin area - only admins, no regular users
    // {
    //     path: '/admin',
    //     Component: AdminPanel,
    //     Protected: Protected,
    //     requiredStatus: 'active',
    //     allowedRoles: ['admin'],
    //     forbiddenRoles: ['student', 'official'] // Extra security
    // },

    // Catch-all route for 404 Not Found
    { path: '*', Component: NotFoundPage }
];