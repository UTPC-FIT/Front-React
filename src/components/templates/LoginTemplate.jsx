import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from '@molecules/ButtonWithIcon';
import LogoDisplay from '@molecules/LogoDisplay';
import Text from '@atoms/Text';
import { FiLogIn } from 'react-icons/fi';
import logoUptc from '@assets/images/logo_uptc.png';

const LoginTemplate = ({ onLogin, loading = false }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-background-light)] to-[var(--color-background-dark)] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <LogoDisplay
                        src={logoUptc}
                        alt="Logo UPTC"
                        className="mx-auto mb-4"
                    />
                    <Text
                        variant="heading2"
                        color="dark"
                        className="mb-2"
                    >
                        UPTC FIT
                    </Text>
                    <Text
                        variant="body"
                        color="medium"
                        className="text-[var(--color-neutral-gray-medium)]"
                    >
                        Bienvenido al sistema de inscripciones
                    </Text>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--color-background-light)] p-4 rounded-lg">
                        <Text
                            variant="caption"
                            color="medium"
                            className="text-center mb-4"
                        >
                            Para acceder al sistema, serás redirigido a la página de autenticación institucional
                        </Text>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <ButtonWithIcon
                            type="submit"
                            variant="primary"
                            size="large"
                            disabled={loading}
                            IconComponent={FiLogIn}
                            iconPosition="right"
                            className="w-full justify-center"
                        >
                            {loading ? 'Redirigiendo...' : 'Iniciar Sesión con UPTC'}
                        </ButtonWithIcon>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <Text
                        variant="caption"
                        color="light"
                        className="text-[var(--color-neutral-gray-medium)]"
                    >
                        ¿Problemas para acceder? Contacta al administrador
                    </Text>
                </div>
            </div>
        </div>
    );
};

LoginTemplate.propTypes = {
    onLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

export default LoginTemplate;