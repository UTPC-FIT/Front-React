import Text from '@atoms/Text';
import Search from '@organisms/Search';
import IconOptions from '@molecules/IconOptions';
import { FaFilter } from 'react-icons/fa';

const TableStudentsHeader = ({ onSearch, onFilterChange, currentFilter }) => { // currentFilter es opcional
    const filterOptions = [
        {
            text: "Activos",
            onClick: () => onFilterChange('active'),
        },
        {
            text: "Inactivos",
            onClick: () => onFilterChange('inactive'),
        },
        {
            text: "Pendientes",
            onClick: () => onFilterChange('pending'),
        },
        {
            text: "Todos", // Opción para limpiar el filtro
            onClick: () => onFilterChange(''),
        },
    ];

    return (
        <div className='flex items-center justify-between'>
            <Text
                variant="heading2"
            >
                Lista de estudiantes
            </Text>

            <div className='flex items-center justify-center gap-2'>
                {/* Pasa la función onSearch al componente Search */}
                <Search onSearch={onSearch} />
                <IconOptions
                    IconComponent={FaFilter}
                    options={filterOptions}
                    variant="awesome"
                />
            </div>
        </div>
    );
};

export default TableStudentsHeader;