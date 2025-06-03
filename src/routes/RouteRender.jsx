import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@routes/index.js';

// Loading fallback component
const RouteLoading = () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--color-neutral-gray-medium)]">Cargando...</p>
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