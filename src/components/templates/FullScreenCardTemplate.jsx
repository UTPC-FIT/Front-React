import React from 'react';
import PropTypes from 'prop-types';

const FullScreenCardTemplate = ({
    children,
    backgroundColor = 'bg-neutral-gray-light',
    className = '',
    maxWidth = 'max-w-5xl',
    minHeight = 'min-h-[545px]',
    fullHeightOnMobile = true
}) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-neutral-white">
            <div className={`
                w-full ${maxWidth} ${minHeight} flex justify-between rounded-lg shadow-md
                ${backgroundColor} ${className}
                md:w-[80%] lg:w-[70%] xl:w-[60%]
                ${fullHeightOnMobile ? 'sm:h-auto h-screen sm:rounded-lg rounded-none' : ''}
                transition-all duration-300
            `}>
                {children}
            </div>
        </div>
    );
};

FullScreenCardTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    className: PropTypes.string,
    maxWidth: PropTypes.string,
    minHeight: PropTypes.string,
    fullHeightOnMobile: PropTypes.bool
};

export default FullScreenCardTemplate;