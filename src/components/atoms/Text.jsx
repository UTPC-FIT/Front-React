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
        heading3: 'text-xl font-semibold',
        body: 'text-base',
        caption: 'text-sm',
        error: 'text-sm',
    };

    const colors = {
        default: 'text-[var(--color-neutral-gray-dark)]',
        medium: 'text-[var(--color-neutral-gray-medium)]',
        light: 'text-[var(--color-neutral-gray-light)]',
        primary: 'text-[var(--color-primary)]',
        error: 'text-[var(--color-accent-red)]',
    };

    return (
        <p className={`${colors[color]} ${variants[variant]} ${className}`}>
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