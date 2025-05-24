// src/routes/index.js
import { lazy } from 'react'
import Protected from '@routes/Protected'

const HomePage = lazy(() => import('@pages/Home/HomePage'))
const NotFoundPage = lazy(() => import('@pages/NotFound/NotFoundPage'))
const InscriptionPage = lazy(() => import('@pages/Inscription/InscriptionPage'))

export const routes = [
    { path: '/', Component: HomePage },
    { path: '/inscripcion', Component: InscriptionPage },
    // Ejemplo de ruta protegida:
    // { path: '/dashboard', Component: DashboardPage, Protected },
    { path: '*', Component: NotFoundPage }
]
