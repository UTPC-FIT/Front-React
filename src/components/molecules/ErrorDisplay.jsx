import React from 'react';
import PropTypes from 'prop-types';
import Text from '../atoms/Text';

const ErrorDisplay = ({
    code,
    title,
    message,
    className = '',
}) => {
    return (
        <div className={`space-y-4 ${className}`}>
            <Text variant="heading1" color="primary">
                {code}
            </Text>
            <Text variant="heading2" color="default">
                {title}
            </Text>
            <Text variant="body" color="medium">
                {message}
            </Text>
        </div>
    );
};

ErrorDisplay.propTypes = {
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ErrorDisplay;