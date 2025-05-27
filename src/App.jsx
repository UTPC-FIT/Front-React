import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

export default function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-neutral-gray-medium)]">Cargando...</p>
        </div>
      </div>
    }>
      <Routes>
        {routes.map(({ path, Component, Protected }) => (
          <Route
            key={path}
            path={path}
            element={
              Protected ? (
                <Protected>
                  <Component />
                </Protected>
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  )
}