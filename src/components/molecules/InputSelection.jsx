import React from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from "react-icons/fi";

const InputSelection = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Seleccione una opción",
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
                    appearance-none bg-white
                    ${error
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 hover:border-[var(--color-primary)] focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]'
                    }
                `;
            default:
                return `
                    w-full px-4 py-2
                    border rounded-lg
                    bg-white
                    transition-all duration-200
                    appearance-none
                    ${error
                        ? 'border-accent-red focus:border-accent-red-light'
                        : 'border-neutral-gray-light focus:border-primary'
                    }
                `;
        }
    };

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-gray-700 font-medium mb-2"
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
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={getVariantStyles()}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <FiChevronDown className={`h-4 w-4 ${error ? 'text-red-500' : 'text-gray-600'}`} />
                </div>
            </div>
            {error && (
                <span className="text-xs text-red-500 mt-1">
                    {error}
                </span>
            )}
        </div>
    );
};

InputSelection.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'primary']),
    icon: PropTypes.node,
};

export default InputSelection;