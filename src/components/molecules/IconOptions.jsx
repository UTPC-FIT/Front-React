import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@atoms/Icon';

const IconOptions = ({ IconComponent, options = [], variant = 'default', ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleIconClick = (event) => {
        event.stopPropagation();
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (onClickFunction) => {
        onClickFunction();
        setIsOpen(false);
    };

    const buttonClasses = variant === 'awesome'
        ? 'flex items-center justify-center p-2 rounded-full hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-dark)]'
        : 'flex items-center justify-center p-2 rounded-full hover:bg-[var(--color-neutral-gray-light)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-medium)]';

    const dropdownClasses = variant === 'awesome'
        ? 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-dark)] ring-opacity-5 focus:outline-none z-10'
        : 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[var(--color-neutral-white)] ring-1 ring-black ring-opacity-5 focus:outline-none z-10';

    const optionClasses = variant === 'awesome'
        ? 'cursor-pointer text-[var(--color-primary-dark)] block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-primary-medium)]'
        : 'cursor-pointer text-[var(--color-neutral-gray-dark)] block w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-neutral-gray-light)]';

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className={buttonClasses}
                    onClick={handleIconClick}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <Icon IconComponent={IconComponent} size="medium" color="gray-700" className="cursor-pointer" {...props} />
                </button>
            </div>

            {isOpen && (
                <div
                    className={dropdownClasses}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(option.onClick)}
                                    className={optionClasses}
                                    role="menuitem"
                                    tabIndex="-1"
                                >
                                    {option.text}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-[var(--color-neutral-gray-medium)]">No hay opciones disponibles</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

IconOptions.propTypes = {
    IconComponent: PropTypes.elementType.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ),
    variant: PropTypes.oneOf(['default', 'awesome']),
};

export default IconOptions;