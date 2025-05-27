import InputWithIcon from '@molecules/InputWithIcon';
import PropTypes from 'prop-types';

import Text from '@atoms/Text';

const InputWithLabel = ({
    label,
    IconComponent,
    iconPosition,
    iconSize,
    iconColor,
    iconClassName,
    errors,
    ...inputProps
}) => {
    return (
        <>
            <div className="flex flex-col gap-1">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <InputWithIcon
                    IconComponent={IconComponent}
                    iconPosition={iconPosition}
                    iconSize={iconSize}
                    iconColor={iconColor}
                    iconClassName={iconClassName}
                    {...inputProps}
                />
            </div>
        </>
    );
};

InputWithLabel.propTypes = {
    label: PropTypes.string,
    IconComponent: PropTypes.elementType,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
    iconColor: PropTypes.string,
    iconClassName: PropTypes.string,
};

export default InputWithLabel;