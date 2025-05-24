import React from 'react';
import PropTypes from 'prop-types';

const Text = ({
    children,
    variant = 'body',
    color = 'default',
    className = '',
}) => {
    const variants = {
        heading1: 'text-9xl font-bold',
        heading2: 'text-3xl font-semibold',
        body: 'text-base',
        caption: 'text-sm',
        error: 'text-sm text-accent-red',
    };

    const colors = {
        default: 'text-neutral-gray-dark',
        medium: 'text-neutral-gray-medium',
        light: 'text-neutral-gray-light',
        primary: 'text-primary',
    };

    return (
        <p className={`${variants[variant]} ${colors[color]} ${className}`}>
            {children}
        </p>
    );
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['heading1', 'heading2', 'body', 'caption', 'error']),
    color: PropTypes.oneOf(['default', 'medium', 'light', 'primary']),
    className: PropTypes.string,
};

export default Text;