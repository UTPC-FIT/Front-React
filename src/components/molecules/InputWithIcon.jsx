import Input from "@atoms/Input"
import Icon from "@atoms/Icon";
import PropTypes from 'prop-types';

const InputWithIcon = ({
    IconComponent,
    iconPosition = 'left',
    iconSize = 'medium',
    iconColor,
    iconClassName = '',
    ...inputProps
}) => {
    return (
        <div className="relative w-full">
            {IconComponent && (
                <div className={`absolute top-1/2 transform -translate-y-1/2 ${iconPosition === 'left' ? 'left-3' : 'right-3'
                    }`}>
                    <Icon
                        IconComponent={IconComponent}
                        size={iconSize}
                        color={iconColor}
                        className={iconClassName}
                    />
                </div>
            )}
            <Input
                {...inputProps}
                className={`${IconComponent ? (
                    iconPosition === 'left' ? 'pl-10' : 'pr-10'
                ) : ''} ${inputProps.className || ''}`}
            />
        </div>
    );
};

InputWithIcon.propTypes = {
    IconComponent: PropTypes.elementType,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconSize: PropTypes.oneOf(['small', 'medium', 'large']),
    iconColor: PropTypes.string,
    iconClassName: PropTypes.string,
};

export default InputWithIcon;