import React from 'react';
import PropTypes from 'prop-types';
import Image from '@atoms/Image';

const LogoDisplay = ({
    src,
    alt = 'Logo',
    className = '',
}) => {
    return (
        <div>
            <Image
                src={src}
                alt={alt}
                className={`h-18 mx-auto ${className}`}
            />
        </div>
    );
};

LogoDisplay.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

export default LogoDisplay;