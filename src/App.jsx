// src/App.jsx
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

export default function App() {
  return (
    <Suspense fallback={<div className="text-center mt-16">Cargando...</div>}>
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
