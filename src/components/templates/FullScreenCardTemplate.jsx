import React from 'react';
import PropTypes from 'prop-types';

const FullScreenCardTemplate = ({
    children,
    backgroundScreenColor = 'bg-[var(--color-background-light)]',
    backgroundColor = 'bg-[var(--color-background-dark)]',
    className = '',
    maxWidth = 'max-w-5xl',
    minHeight = 'min-h-[545px]',
    fullHeightOnMobile = true
}) => {
    return (
        <div className={`
            min-h-screen w-full flex items-center justify-center p-4 ${backgroundScreenColor}`}>
            <div className={`
                w-full ${maxWidth} ${minHeight} flex flex-col rounded-lg shadow-md ${backgroundColor} ${className}
                md:w-[80%] lg:w-[70%] xl:w-[60%]
                p-8
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