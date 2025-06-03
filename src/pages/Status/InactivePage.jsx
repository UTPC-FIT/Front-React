import React from 'react';
import { useAuth } from '@context/AuthContext';

export default function InactivePage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)]">
            <div className="max-w-md w-full mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Cuenta Inactiva
                        </h1>
                        <p className="text-gray-600">
                            Hola {user?.username || 'Usuario'}, tu cuenta está actualmente inactiva.
                        </p>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-red-800 mb-2">
                            Tu cuenta ha sido desactivada por las siguientes posibles razones:
                        </p>
                        <ul className="text-xs text-red-700 text-left space-y-1">
                            <li>• Violación de términos de servicio</li>
                            <li>• Inactividad prolongada</li>
                            <li>• Solicitud de desactivación</li>
                            <li>• Problemas de verificación</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                                Para reactivar tu cuenta, contacta al administrador del sistema.
                            </p>
                        </div>

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