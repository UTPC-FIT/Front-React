import React, { useState, useEffect } from 'react';
import { getAllTurns } from '../../api/endpoints/turnsApi';
import { createSchedule } from '../../api/endpoints/schedulesApi';
import logoUPTC from '@assets/images/logo_uptc.png';
import LogoDisplay from '@components/molecules/LogoDisplay';
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@components/molecules/footers/Footer';
import { useAuth } from '@context/AuthContext';

const AssignSchedulePage = () => {
    const [turns, setTurns] = useState([]);
    const [selectedTurnId, setSelectedTurnId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchTurns = async () => {
            try {
                const fetchedTurns = await getAllTurns();
                setTurns(fetchedTurns);
            } catch (err) {
                setError('Error al cargar turnos disponibles.');
            }
        };
        fetchTurns();
        setStudentId(user.id_student); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        console.log(studentId, selectedTurnId);

        if (!selectedTurnId || !studentId) {
            setError('Por favor, selecciona un turno e ingresa tu ID de estudiante.');
            setStudentId(user.id_student);
            return;
        }

        try {
            const newSchedule = await createSchedule({
                turn_id: parseInt(selectedTurnId),
                student_id: studentId,
            });
            console.log(studentId, selectedTurnId);
            setMessage(`Asignación creada exitosamente para el estudiante ${newSchedule.id_student} en el turno ${newSchedule.id_turn}.`);
            setSelectedTurnId('');
            setStudentId(user.id_student);
        } catch (err) {
            setError(`Error al crear asignación: ${err.message}`);
        }
    };

    // Menú para el HeaderTemplate
    const menu = [
        { name: 'Programar Turno', href: '/assign' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-neutral-white">
            {/* Header */}
            <HeaderTemplate menu={menu} />

            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center p-4 flex-grow pb-55">
                <div className="max-w-4xl w-full space-y-8">
                    {/* Logo */}
                    <LogoDisplay src={logoUPTC} alt="UPTC Logo" />

                    {/* Título */}
                    <h1 id="assign-title" className="text-3xl font-bold text-center text-[var(--color-primary)]">
                        Asignarte a un Turno
                    </h1>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div id="student-id-input">
                            <label className="block text-sm font-medium text-gray-700">Tu ID de Estudiante:</label>
                            <input
                                type="string"
                                required
                                disabled
                                value={user.id_student}
                                onChange={(e) => setStudentId(e.target.value)}
                                placeholder="Ej: 1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] text-gray-500 italic"
                            />
                        </div>
                        <div id="turn-select">
                            <label className="block text-sm font-medium text-gray-700">Seleccionar Turno:</label>
                            <select
                                value={selectedTurnId}
                                onChange={(e) => setSelectedTurnId(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            >
                                <option value="">-- Selecciona un turno --</option>
                                {turns.map((turn) => (
                                    <option key={turn.id_turn} value={turn.id_turn}>
                                        {turn.day} {turn.start_time} - {turn.end_time} (Capacidad: {turn.max_capacity})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            id="assign-button"
                            type="submit"
                            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-2 px-4 rounded"
                        >
                            Asignarme al Turno
                        </button>
                    </form>

                    {/* Mensajes */}
                    {message && <p className="text-green-600 text-center">{message}</p>}
                    {error && <p className="text-red-600 text-center">{error}</p>}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AssignSchedulePage;