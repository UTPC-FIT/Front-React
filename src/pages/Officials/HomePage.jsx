import React, { useState, useMemo } from 'react';

import OfficialTemplate from '@templates/OfficialTemplate';

import TableStudentsHeader from '@organisms/headers/TableStudentsHeader';
import TableStudentsTemplate from '@templates/TableStudentsTemplate';

import useStudents from '@hooks/useStudents';

const HomePage = () => {
    const { students, loading, error } = useStudents();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Lógica de filtrado y búsqueda combinada, optimizada con useMemo
    const filteredAndSearchedStudents = useMemo(() => {
        if (!students) return [];

        let currentStudents = [...students];

        // Aplicar lógica de búsqueda
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            currentStudents = currentStudents.filter(student => {
                const firstName = student.firstName.toLowerCase();
                const lastName = student.lastName.toLowerCase();
                const code = student.studentCode ? student.studentCode.toLowerCase() : '';

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
    }, [students, searchTerm, filterStatus]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    if (loading) return (
        <OfficialTemplate>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-background-dark)]">
                            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--color-primary)] border-r-transparent border-b-transparent border-l-transparent"></div>
                        </div>
                    </div>
                    <p className="text-[var(--color-neutral-gray-blue)] font-medium">
                        Cargando estudiantes...
                    </p>
                </div>
            </div>
        </OfficialTemplate>
    );
    if (error) return <div>Error: {error}</div>;

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
                currentFilter={filterStatus}
            />
            <TableStudentsTemplate students={filteredAndSearchedStudents} />
        </OfficialTemplate>
    );
};

export default HomePage;