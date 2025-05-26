import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    type = 'text',
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = '',
    disabled = false,
    variant = 'default',
    icon,
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return `
                    pl-${icon ? '10' : '4'} w-full py-2 px-4 
                    rounded-lg border 
                    focus:ring-2 
                    focus:outline-none 
                    transition-colors
                    ${error
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 hover:border-[var(--color-primary)] focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]'
                    }
                `;
            default:
                return `
                    w-full px-4 py-2
                    border rounded-lg
                    bg-neutral-white
                    transition-all duration-200
                    placeholder:text-neutral-gray-medium
                    ${error
                        ? 'border-accent-red focus:border-accent-red-light'
                        : 'border-neutral-gray-light focus:border-primary'
                    }
                `;
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-neutral-gray-dark"
                >
                    {label}
                    {required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className={`absolute top-3 left-3 ${error ? 'text-red-500' : 'text-gray-600'}`}>
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
                        ${getVariantStyles()}
                        ${disabled ? 'bg-neutral-gray-light cursor-not-allowed' : ''}
                        ${className}
                    `}
                />
            </div>
            {error && (
                <span className="text-xs text-[var(--color-accent-red)] mt-1">
                    {error}
                </span>
            )}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'primary']),
    icon: PropTypes.node,
};

export default Input;