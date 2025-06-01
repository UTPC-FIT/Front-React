import PropTypes from 'prop-types';

import UserRow from '@molecules/UserRow';
import HeaderUserRow from '@molecules/HeaderUserRow'


export default function TableStudents({ students }) {

    if (!students || students.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No hay estudiantes registrados.
            </div>
        );
    }

    return (
        <table className={`table-auto md:table-fixed`}>
            <HeaderUserRow />
            <tbody>
                {
                    students.map((student) => (
                        <UserRow
                            key={student.studentId}
                            student={student}
                            to={`/officials/student/${student.studentId}`}
                        />
                    ))
                }
            </tbody>
        </table>
    )

}

TableStudents.propTypes = {
    students: PropTypes.arrayOf(PropTypes.shape({
        studentId: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        studentCode: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['active', 'inactive', 'pending']).isRequired
    }))
};
