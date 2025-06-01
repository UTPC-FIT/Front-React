import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@atoms/Icon'

import { FaCheckCircle } from 'react-icons/fa';
import { TiWarning } from 'react-icons/ti';

const StatusBadge = ({ status }) => {
    let bgColor = 'bg-gray-500';
    let IconComponent = TiWarning;
    let label = 'Desconocido';

    if (status === 'active') {
        bgColor = 'bg-green-500';
        IconComponent = FaCheckCircle;
        label = 'Activo';
    } else if (status === 'pending') {
        bgColor = 'bg-red-500';
        IconComponent = TiWarning;
        label = 'Pendiente';
    } else if (status === 'inactive') {
        bgColor = 'bg-gray-500';
        IconComponent = TiWarning;
        label = 'Inactivo';
    }

    return (
        <span className={`${bgColor} text-white px-2 py-1 rounded-full flex items-center justify-center gap-1 font-semibold`}>
            {label}
            <Icon
                size="small"
                IconComponent={IconComponent}
            />
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.oneOf(['active', 'pending', 'inactive']).isRequired,
};

export default StatusBadge;