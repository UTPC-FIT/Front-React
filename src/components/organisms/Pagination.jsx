import React from 'react';

import Text from '@atoms/Text';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange, disablePrevious }) => {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <button
                id='before'
                className={`px-4 py-2 mx-1 text-white rounded transition-colors duration-300 ${currentPage === 1 || disablePrevious || totalPages === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-[var(--color-primary-dark)]'
                    }`}
                style={{
                    backgroundColor: currentPage === 1 || disablePrevious || totalPages === 0
                        ? 'var(--color-primary-light)'
                        : 'var(--color-primary)',
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || disablePrevious || totalPages === 0}
            >
                <MdNavigateBefore className="transition-transform duration-300 transform hover:-translate-x-1" />
            </button>
            <Text>
                Página {currentPage} de {totalPages}
            </Text>
            <button
                id='next'
                className={`px-4 py-2 mx-1 text-white rounded transition-colors duration-300 ${currentPage === totalPages || totalPages === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-[var(--color-primary-dark)]'
                    }`}
                style={{
                    backgroundColor: currentPage === totalPages || totalPages === 0
                        ? 'var(--color-primary-light)'
                        : 'var(--color-primary)',
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                <MdNavigateNext className="transition-transform duration-300 transform hover:translate-x-1" />
            </button>
        </div>
    );
};

export default Pagination;