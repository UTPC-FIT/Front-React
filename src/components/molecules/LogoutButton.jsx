import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from '@molecules/ButtonWithIcon';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({
    onLogout,
    className = '',
    children = 'Cerrar Sesión',
    size = 'medium'
}) => {
    return (
        <ButtonWithIcon
            onClick={onLogout}
            variant="danger"
            size={size}
            IconComponent={FiLogOut}
            iconPosition="left"
            className={className}
        >
            {children}
        </ButtonWithIcon>
    );
};

LogoutButton.propTypes = {
    onLogout: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default LogoutButton;