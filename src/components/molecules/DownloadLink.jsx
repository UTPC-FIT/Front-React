import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@atoms/Icon';
import Text from '@atoms/Text';

const DownloadLink = ({
    href,
    text,
    IconComponent,
    className = '',
    external = false,
}) => {
    const LinkComponent = external ? 'a' : Link;
    const linkProps = external ? { href, target: '_blank', rel: "noopener noreferrer" } : { to: href };

    return (
        <LinkComponent
            {...linkProps}
            className={`group flex items-center justify-start space-x-2 relative px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary-medium hover:after:w-full after:transition-all after:duration-300 ${className}`}
        >
            <Text color="default" className="font-semibold">
                {text}
            </Text>
            <Icon
                IconComponent={IconComponent}
                className="h-6 w-6 text-primary group-hover:text-primary-medium"
                size="medium"
            />
        </LinkComponent>
    );
};

DownloadLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    IconComponent: PropTypes.elementType.isRequired,
    className: PropTypes.string,
    external: PropTypes.bool,
};

export default DownloadLink;