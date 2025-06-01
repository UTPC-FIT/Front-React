import React from 'react';
import { useNavigate } from 'react-router-dom';

import Text from '@atoms/Text'
import StatusBadge from '@molecules/StatusBadge';

const UserRow = ({ student, to = "" }) => {
    const navigate = useNavigate();
    const {
        firstName,
        lastName,
        studentCode,
        email,
        status } = student;

    const fullName = `${firstName} ${lastName}`
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <tr
            onClick={() => navigate(to, { replace: true })}
            className="border-b border-[var(--color-neutral-gray-light)] hover:bg-[var(--color-primary-light)] cursor-pointer transition-colors duration-200"
        >
            <td className="px-6 py-4 font-montserrat">
                <Text>
                    {fullName}
                </Text>
            </td>
            <td className="px-6 py-4 font-montserrat flex justify-center">
                <Text>
                    {studentCode || 'N/A'}
                </Text>
            </td>
            <td className="px-6 py-4 font-montserrat">
                <Text>
                    {email}
                </Text>
            </td>
            <td className="px-6 py-4 font-montserrat flex justify-center">
                <StatusBadge status={status} />
            </td>
            {/* <td className="px-6 py-4 font-montserrat flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                <button className="text-blue-600 hover:text-blue-800">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full hover:bg-blue-400">
                        <FaUserEdit className="w-6 h-6" />
                    </div>
                </button>
                <button onClick={() => onDisable({ id: idUser, documentNumber: person.documentNumberPerson, name: fullName })} className="text-red-600 hover:text-red-800">
                    <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full hover:bg-red-400">
                        <FaUserSlash className="w-5 h-5" />
                    </div>
                </button>
            </td> */}
        </tr>
    );
};

export default UserRow;
