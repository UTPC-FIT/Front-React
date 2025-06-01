import React from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterDropdown = ({ showFilter, onToggle, onSelect }) => (
    <div className="relative" onClick={(e) => e.stopPropagation()} tabIndex={0}>
        <button onClick={onToggle} className="flex items-center p-2">
            <FaFilter className="w-5 h-5 text-neutral-gray-medium transition-all duration-120 hover:text-primary-medium" />
        </button>
        {showFilter && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <li onClick={() => onSelect("")} className="p-2 cursor-pointer hover:bg-primary-medium">Todos</li>
                <li onClick={() => onSelect('ACT')} className="p-2 cursor-pointer hover:bg-primary-medium">Activo</li>
                <li onClick={() => onSelect('PEN')} className="p-2 cursor-pointer hover:bg-primary-medium">Pendiente</li>
                <li onClick={() => onSelect('INA')} className="p-2 cursor-pointer hover:bg-primary-medium">Inactivo</li>
            </ul>
        )}
    </div>
);

export default FilterDropdown;