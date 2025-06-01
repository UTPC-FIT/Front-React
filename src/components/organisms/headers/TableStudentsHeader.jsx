import Text from '@atoms/Text'

import Search from '@organisms/Search'
import IconOptions from '@molecules/IconOptions'

import { FaFilter } from "react-icons/fa";

const TableStudentsHeader = () => {
    const filterOptions = [
        {
            text: "Activos",
            onClick: () => { }
        },
        {
            text: "Inactivos",
            onClick: () => { }
        },
        {
            text: "Pendientes",
            onClick: () => { }
        },
    ]

    return (
        <div className='flex items-center justify-between'>
            <Text
                variant="heading2"
            >
                Lista de estudiantes
            </Text>

            <div className='flex items-center justify-center gap-2'>
                <Search />
                <IconOptions
                    IconComponent={FaFilter}
                    options={filterOptions}
                    variant="awesome"
                />
            </div>
        </div>
    )
}

export default TableStudentsHeader;