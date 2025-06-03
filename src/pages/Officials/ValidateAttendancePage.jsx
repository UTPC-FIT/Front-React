import React, { useState, useEffect } from 'react';
import { getAllTurns } from '../../api/endpoints/turnsApi';
import { getTurnStudents, markAttendance, cancelSchedule } from '../../api/endpoints/schedulesApi';
import logoUPTC from '@assets/images/logo_uptc.png';
import LogoDisplay from '@components/molecules/LogoDisplay';
import { toast } from 'react-toastify';
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@components/molecules/footers/Footer';
import { useAuth } from '@context/AuthContext';

const ValidateAttendancePage = () => {
    const [turns, setTurns] = useState([]);
    const [selectedTurnId, setSelectedTurnId] = useState('');
    const [studentsInTurn, setStudentsInTurn] = useState([]);
    const [officialId, setOfficialId] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchTurns = async () => {
            try {
                const fetchedTurns = await getAllTurns();
                setTurns(fetchedTurns);
            } catch (err) {
                setError('Error al cargar turnos.');
                toast.error('Error al cargar turnos.');
            }
        };
        fetchTurns();
        setOfficialId(user.id_student); // Asignar el ID oficial del usuario al cargar la página
    }, []);

    const handleTurnChange = async (e) => {
        const id = e.target.value;
        setSelectedTurnId(id);
        setStudentsInTurn([]);
        setError('');

        if (id) {
            try {
                const students = await getTurnStudents(id, 'current');
                setStudentsInTurn(students);
                if (students.length === 0) {
                    toast.info('No hay estudiantes programados para este turno hoy.');
                }
            } catch (err) {
                setError(`Error al cargar estudiantes del turno: ${err.message}`);
                toast.error(`Error al cargar estudiantes del turno: ${err.message}`);
            }
        }
    };

    const handleMarkAttendance = async (studentId) => {
        if (!officialId) {
            setError('Por favor, ingresa tu ID Oficial antes de marcar asistencia.');
            toast.error('Por favor, ingresa tu ID Oficial antes de marcar asistencia.');
            return;
        }
        setError('');
        try {
            await markAttendance(studentId, officialId);
            toast.success(`Asistencia marcada para estudiante ${studentId}.`);
            setSelectedTurnId(''); // Restablecer el campo de selección de turno
            setStudentsInTurn([]); // Limpiar la lista de estudiantes
        } catch (err) {
            setError(`Error al marcar asistencia para estudiante ${studentId}: ${err.message}`);
            toast.error(`Error al marcar asistencia para estudiante ${studentId}: ${err.message}`);
        }
    };

    const handleCancelSchedule = async (studentId) => {
        setError('');
        try {
            await cancelSchedule(studentId);
            toast.success(`Programación cancelada para estudiante ${studentId}.`);
            setSelectedTurnId(''); // Restablecer el campo de selección de turno
            setStudentsInTurn([]); // Limpiar la lista de estudiantes
        } catch (err) {
            setError(`Error al cancelar programación para estudiante ${studentId}: ${err.message}`);
            toast.error(`Error al cancelar programación para estudiante ${studentId}: ${err.message}`);
        }
    };

    // Menú para el HeaderTemplate
    const menu = [
        { name: 'Estudiantes', href: '/officials' },
        { name: 'Listar Turnos', href: '/officials/list' },
        { name: 'Crear Turno', href: '/officials/turn' },
        { name: 'Registrar Asistencia', href: '/officials/validate' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-neutral-white">
            {/* Header */}
            <HeaderTemplate menu={menu} />

            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center p-4 flex-grow pb-70">
                <div className="max-w-4xl w-full space-y-8">
                    {/* Logo */}
                    <LogoDisplay src={logoUPTC} alt="UPTC Logo" />

                    {/* Título */}
                    <h1 id="validate-attendance-title" className="text-3xl font-bold text-center text-[var(--color-primary)]">
                        Validar Asistencia de Turnos
                    </h1>

                    {/* Formulario */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tu ID Oficial:</label>
                            <input
                                id="official-id-input"
                                type="string"
                                disabled
                                value={user.id_student}
                                onChange={(e) => setOfficialId(e.target.value)}
                                placeholder="Ej: 789"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] text-gray-500 italic"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Seleccionar Turno:</label>
                            <select
                                id="turn-select"
                                value={selectedTurnId}
                                onChange={handleTurnChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            >
                                <option value="">-- Selecciona un turno --</option>
                                {turns.map((turn) => (
                                    <option key={turn.id_turn} value={turn.id_turn}>
                                        {turn.day} {turn.start_time} - {turn.end_time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Lista de estudiantes */}
                    {selectedTurnId && studentsInTurn.length > 0 && (
                        <div id="students-list" className="space-y-4">
                            <h2 id="students-list-title" className="text-xl font-bold text-gray-800">
                                Estudiantes programados para hoy en este turno:
                            </h2>
                            <ul className="space-y-2">
                                {studentsInTurn.map((student) => (
                                    <li
                                        key={student.id_student}
                                        className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
                                    >
                                        <span>
                                            Estudiante ID: {student.id_student} - Estado: {student.status}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                id="mark-attendance-button"
                                                onClick={() => handleMarkAttendance(student.id_student)}
                                                disabled={student.status !== 'scheduled' || !officialId}
                                                className={`py-1 px-3 rounded ${
                                                    student.status === 'scheduled' && officialId
                                                        ? 'bg-green-500 hover:bg-green-700 text-white'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            >
                                                Marcar Asistencia
                                            </button>
                                            <button
                                                id="cancel-schedule-button"
                                                onClick={() => handleCancelSchedule(student.id_student)}
                                                disabled={student.status !== 'scheduled'}
                                                className={`py-1 px-3 rounded ${
                                                    student.status === 'scheduled'
                                                        ? 'bg-red-500 hover:bg-red-700 text-white'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedTurnId && studentsInTurn.length === 0 && !error && (
                        <p className="text-center text-gray-600">
                            No hay estudiantes programados para este turno hoy o que puedan ser marcados/cancelados.
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ValidateAttendancePage;