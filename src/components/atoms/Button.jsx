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
    justify = 'center',
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center';

    const variants = {
        primary: 'bg-[var(--color-primary-medium)] hover:bg-[var(--color-primary-light)] text-[var(--color-neutral-gray-dark)]',
        secondary: 'bg-[var(--color-neutral-gray-light)] text-[var(--color-neutral-gray-dark)] hover:bg-[var(--color-neutral-gray-medium)]',
        danger: 'bg-[var(--color-accent-red)] hover:bg-[var(--color-accent-red-light)] text-[var(--color-neutral-white)]',
        success: 'bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-[var(--color-neutral-white)]',
        outline: 'border-2 border-[var(--color-primary-medium)] text-[var(--color-primary-medium)] hover:bg-[var(--color-primary-light)]',
    };

    const sizes = {
        small: 'px-4 py-1 text-sm h-8',
        medium: 'px-6 py-2 text-base h-12',
        large: 'px-8 py-3 text-lg h-14',
    };

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const justifyClass = `justify-${justify}`;

    return (
        <button
            type={type}
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]} 
                ${justifyClass}
                ${disabledStyles} 
                ${className}
            `}
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
    justify: PropTypes.string,
};

export default Button;