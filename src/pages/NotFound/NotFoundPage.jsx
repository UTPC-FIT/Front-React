import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import logoUPTC from '@assets/images/logo_uptc.png';
import LogoDisplay from '@components/molecules/LogoDisplay';
import ErrorDisplay from '@components/molecules/ErrorDisplay';
import NavigationButton from '@components/molecules/NavigationButton';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-white p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo */}
                <LogoDisplay src={logoUPTC} alt="UPTC Logo" />

                {/* Error information */}
                <ErrorDisplay
                    code="404"
                    title="Página no encontrada"
                    message="Lo sentimos, la página que estás buscando no existe o ha sido movida."
                />

                {/* Navigation */}
                <NavigationButton
                    to="/"
                    text="Volver al inicio"
                    IconComponent={FiArrowLeft}
                    iconPosition="left"
                    className="mt-12"
                />
            </div>
        </div>
    );
};

export default NotFoundPage;