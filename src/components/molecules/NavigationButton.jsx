import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonWithIcon from './ButtonWithIcon';

const NavigationButton = ({
    to,
    text,
    IconComponent,
    iconPosition = 'left',
    variant = 'primary',
    size = 'large',
    className = '',
}) => {
    return (
        <div className={`mt-12 ${className}`}>
            <Link to={to} className="inline-block">
                <ButtonWithIcon
                    variant={variant}
                    IconComponent={IconComponent}
                    iconPosition={iconPosition}
                    size={size}
                >
                    {text}
                </ButtonWithIcon>
            </Link>
        </div>
    );
};

NavigationButton.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    IconComponent: PropTypes.elementType.isRequired,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    variant: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
};

export default NavigationButton;