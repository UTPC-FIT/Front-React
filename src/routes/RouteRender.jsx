import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@routes/index.js';

// Loading fallback component
const RouteLoading = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"> {/* Fondo degradado suave */}
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center">
            {/* Loader animado con gradiente */}
            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute animate-spin-slow rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-500 opacity-75"></div> {/* Anillo exterior */}
                <div className="absolute animate-spin-fast rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 opacity-75"></div> {/* Anillo intermedio */}
                <div className="absolute animate-spin-medium rounded-full h-8 w-8 border-t-4 border-b-4 border-purple-300 opacity-75"></div> {/* Anillo interior */}
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full animate-bounce-custom"></div> {/* Centro pulsante */}
            </div>
            <p className="text-lg font-semibold text-gray-700 animate-pulse-slow">Cargando contenido...</p>
            <p className="text-sm text-gray-500 mt-2">Por favor, espera un momento.</p>
        </div>
    </div>
);

export default function RouteRenderer() {
    return (
        <Suspense fallback={<RouteLoading />}>
            <Routes>
                {routes.map((route, index) => {
                    const {
                        path,
                        Component,
                        Protected: ProtectedComponent,
                        allowedRoles,
                        forbiddenRoles,
                        requiredStatus
                    } = route;

                    return (
                        <Route
                            key={index}
                            path={path}
                            element={
                                ProtectedComponent ? (
                                    <ProtectedComponent
                                        allowedRoles={allowedRoles || []}
                                        forbiddenRoles={forbiddenRoles || []}
                                        requiredStatus={requiredStatus || null}
                                    >
                                        <Component />
                                    </ProtectedComponent>
                                ) : (
                                    <Component />
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </Suspense>
    );
}