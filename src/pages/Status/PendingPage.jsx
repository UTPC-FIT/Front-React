import React from 'react';
import { useAuth } from '@context/AuthContext';

export default function PendingPage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
            <div className="max-w-md w-full mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Cuenta Pendiente
                        </h1>
                        <p className="text-gray-600">
                            Hola {user?.username || 'Usuario'}, tu cuenta está pendiente de aprobación.
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            Tu registro ha sido recibido y está siendo revisado por nuestro equipo.
                            Te notificaremos por email cuando tu cuenta sea activada.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">
                            Tiempo estimado de revisión: 24-48 horas
                        </p>

                        <button
                            onClick={logout}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}