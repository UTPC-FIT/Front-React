import PropTypes from 'prop-types';

import Text from '@atoms/Text'
import Icon from '@atoms/Icon'

const TitleWithIcon = ({
    IconComponent,
    iconPosition = "right",
    size = "medium",
    gap = "1",
    children
}) => {
    return (
        <div
            className={`flex items-center justify-center gap-${gap} ${iconPosition === "left" ? "flex-row-reverse" : "flex-row"
                }`}
        >
            <Text
                variant={`${size === "medium" ? "heading2" : (
                    size === "large" ? "heading1" : (
                        size === "small" ? "heading3" : "body"
                    ))
                    }`}

            >
                {children}
            </Text>
            <Icon
                IconComponent={IconComponent}
                size={size}
                className="font-semibold text-[var(--color-neutral-gray-dark)]"
            />
        </div>
    )
}

TitleWithIcon.propTypes = {
    IconComponent: PropTypes.elementType.isRequired,
    iconPosition: PropTypes.oneOf(["left", "right"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    gap: PropTypes.string,
}

export default TitleWithIcon;