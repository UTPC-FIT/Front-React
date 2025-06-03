import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTurn } from '../../api/endpoints/turnsApi';
import { toast } from 'react-toastify';
import logoUPTC from '@assets/images/logo_uptc.png';
import LogoDisplay from '@components/molecules/LogoDisplay';
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@components/molecules/footers/Footer';

const CreateTurnPage = () => {
    const [turnData, setTurnData] = useState({
        day: 'MONDAY', // Almacenar siempre en inglés
        start_time: '',
        end_time: '',
        max_capacity: 0,
        status: 'active',
        color_turn: '#000000',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Mapeo de días en español e inglés
    const daysMap = {
        MONDAY: 'LUNES',
        TUESDAY: 'MARTES',
        WEDNESDAY: 'MIÉRCOLES',
        THURSDAY: 'JUEVES',
        FRIDAY: 'VIERNES',
        SATURDAY: 'SÁBADO',
        SUNDAY: 'DOMINGO',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTurnData((prevData) => ({
            ...prevData,
            [name]: name === 'max_capacity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newTurn = await createTurn(turnData); // Enviar directamente en inglés
            toast.success(`Turno creado exitosamente con ID: ${newTurn.id_turn}`);
            navigate('/turn');
        } catch (err) {
            let errorMessage = err.message;
            if (err.response && err.response.data && err.response.data.errors) {
                errorMessage = err.response.data.errors.join(', ');
            }
            toast.error(`Error al crear turno: ${errorMessage}`);
        } finally {
            setLoading(false);
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
            <div className="flex flex-col items-center justify-center p-4">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <LogoDisplay src={logoUPTC} alt="UPTC Logo" className="mx-auto mb-4" />
                    <h1 id="create-turn-tittle" className="text-2xl font-bold text-center text-[var(--color-primary)]">Crear Nuevo Turno</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div id="turn-day-select">
                            <label className="block text-sm font-medium text-gray-700">Día:</label>
                            <select
                                name="day"
                                value={turnData.day}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            >
                                {Object.entries(daysMap).map(([dayInEnglish, dayInSpanish]) => (
                                    <option key={dayInEnglish} value={dayInEnglish}>
                                        {dayInSpanish}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div id="turn-start-time-input">
                            <label className="block text-sm font-medium text-gray-700">Hora de inicio (HH:MM):</label>
                            <input
                                type="time"
                                name="start_time"
                                value={turnData.start_time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <div id="turn-end-time-input">
                            <label className="block text-sm font-medium text-gray-700">Hora de fin (HH:MM):</label>
                            <input
                                type="time"
                                name="end_time"
                                value={turnData.end_time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <div id="turn-max-capacity-input">
                            <label className="block text-sm font-medium text-gray-700">Capacidad Máxima:</label>
                            <input
                                type="number"
                                name="max_capacity"
                                value={turnData.max_capacity}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <div id="turn-status-select">
                            <label className="block text-sm font-medium text-gray-700">Estado:</label>
                            <select
                                name="status"
                                value={turnData.status}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </div>
                        <div id="turn-color-input">
                            <label className="block text-sm font-medium text-gray-700">Color del Turno:</label>
                            <input
                                type="color"
                                name="color_turn"
                                value={turnData.color_turn}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <button
                            id="create-turn-button"
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                            }`}
                        >
                            {loading ? 'Creando...' : 'Crear Turno'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateTurnPage;