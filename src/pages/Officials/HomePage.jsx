import React, { useState, useMemo } from 'react';

import OfficialTemplate from '@templates/OfficialTemplate';

import TableStudentsHeader from '@organisms/headers/TableStudentsHeader';
import TableStudentsTemplate from '@templates/TableStudentsTemplate';

const initialStudentsData = [
    {
        studentId: "123",
        firstName: "John",
        lastName: "Garzón",
        studentCode: "202212048",
        email: "john.garzon@uptc.edu.co",
        status: "active" // active, inactive, pending
    },
    {
        studentId: "1234",
        firstName: "Jane",
        lastName: "Doe",
        studentCode: "202212049",
        email: "jane.doe@uptc.edu.co",
        status: "inactive"
    },
    {
        studentId: "12345",
        firstName: "Alice",
        lastName: "Smith",
        studentCode: "202212050",
        email: "alice.smith@uptc.edu.co",
        status: "pending"
    },
    {
        studentId: "123456",
        firstName: "Bob",
        lastName: "Johnson",
        studentCode: "202212051",
        email: "bob.johnson@uptc.edu.co",
        status: "active"
    },
    // ... agrega más estudiantes aquí con la misma estructura
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState(''); // 'active', 'inactive', 'pending', o '' para todos

    // Lógica de filtrado y búsqueda combinada, optimizada con useMemo
    const filteredAndSearchedStudents = useMemo(() => {
        let currentStudents = [...initialStudentsData]; // Trabaja con una copia de los datos originales

        // Aplicar lógica de búsqueda
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            currentStudents = currentStudents.filter(student => {
                // Accede directamente a las propiedades de la estructura de estudiantes
                const firstName = student.firstName.toLowerCase();
                const lastName = student.lastName.toLowerCase();
                const code = student.studentCode ? student.studentCode.toLowerCase() : ''; // `studentCode` puede no existir

                return (
                    firstName.includes(term) ||
                    lastName.includes(term) ||
                    code.includes(term)
                );
            });
        }

        // Aplicar lógica de filtro por estado
        if (filterStatus) {
            currentStudents = currentStudents.filter(student =>
                student.status === filterStatus
            );
        }

        return currentStudents;
    }, [searchTerm, filterStatus]); // Se recalcula cuando searchTerm o filterStatus cambian

    // Funciones para pasar a los componentes hijos
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    return (
        <OfficialTemplate
            backgroundScreenColor='bg-[var(--color-background-dark)]'
            backgroundColor='bg-[var(--color-background-light)]'
            className="flex flex-col gap-8"
            largeWidth="90%"
        >
            <TableStudentsHeader
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                currentFilter={filterStatus} // Pasa el filtro actual para posibles resaltados
            />
            <TableStudentsTemplate students={filteredAndSearchedStudents} />
        </OfficialTemplate>
    );
};

export default HomePage;