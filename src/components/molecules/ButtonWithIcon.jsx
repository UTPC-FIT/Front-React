import React from 'react';
import PropTypes from 'prop-types';
import Button from '@atoms/Button';
import Icon from '@atoms/Icon';

const ButtonWithIcon = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    onClick,
    justify = 'center',
    IconComponent,
    iconPosition = 'right',
    iconClassName = '',
}) => {
    // Map button size to icon size
    const iconSizeMap = {
        small: 'small',
        medium: 'medium',
        large: 'medium',
    };

    return (
        <div className="inline-block group">
            <Button
                type={type}
                variant={variant}
                size={size}
                disabled={disabled}
                onClick={onClick}
                justify={justify}
                className={`gap-2 ${className}`}
            >
                {iconPosition === 'left' && IconComponent && (
                    <Icon
                        IconComponent={IconComponent}
                        size={iconSizeMap[size]}
                        className={`transition-transform duration-200 group-hover:-translate-x-1 ${iconClassName}`}
                    />
                )}

                {children}

                {iconPosition === 'right' && IconComponent && (
                    <Icon
                        IconComponent={IconComponent}
                        size={iconSizeMap[size]}
                        className={`transition-transform duration-200 group-hover:translate-x-1 ${iconClassName}`}
                    />
                )}
            </Button>
        </div>
    );
};

ButtonWithIcon.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    justify: PropTypes.string,
    IconComponent: PropTypes.elementType.isRequired,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconClassName: PropTypes.string,
};

export default ButtonWithIcon;