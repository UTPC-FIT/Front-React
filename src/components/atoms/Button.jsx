import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    onClick,
}) => {
    const baseStyles = 'rounded-lg font-semibold transition-all duration-200 focus:outline-none';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    };

    const sizes = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;