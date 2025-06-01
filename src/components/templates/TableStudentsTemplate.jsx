import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TableStudents from '@organisms/tables/TableStudents';
import Pagination from '@organisms/Pagination';

const mockStudents = [
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
    }
];

const ITEMS_PER_PAGE = 7;

const TableStudentsTemplate = ({ students = mockStudents }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedStudents = students.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <TableStudents students={paginatedStudents} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disablePrevious={false}
            />
        </>
    );
};

TableStudentsTemplate.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            studentId: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            studentCode: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            status: PropTypes.oneOf(['active', 'inactive', 'pending']).isRequired
        })
    )
};

export default TableStudentsTemplate;