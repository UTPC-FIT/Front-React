// src/routes/index.js
import { lazy } from 'react'
import Protected from './Protected'

const HomePage = lazy(() => import('../pages/Home/HomePage'))
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'))

export const routes = [
    { path: '/', Component: HomePage },
    // Ejemplo de ruta protegida:
    // { path: '/dashboard', Component: DashboardPage, Protected },
    { path: '*', Component: NotFoundPage }
]
