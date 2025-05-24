import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
    IconComponent,
    size = 'medium',
    color = 'inherit',
    className = '',
}) => {
    const sizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl',
    };

    return (
        <IconComponent
            className={`
                ${sizeClasses[size]}
                text-${color}
                ${className}
            `}
        />
    );
};

Icon.propTypes = {
    IconComponent: PropTypes.elementType.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Icon;