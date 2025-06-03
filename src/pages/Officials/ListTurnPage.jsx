import React, { useState, useEffect } from 'react';
import { getAllTurns, updateTurn, deactivateTurn } from '../../api/endpoints/turnsApi';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import logoUPTC from '@assets/images/logo_uptc.png';
import LogoDisplay from '@components/molecules/LogoDisplay';
import ConfirmationModal from '@components/molecules/ConfirmationModal';
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@components/molecules/footers/Footer';

function ListTurnsPage() {
  const [turns, setTurns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [turnToDeactivate, setTurnToDeactivate] = useState(null);

  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const statusOptions = ['active', 'inactive'];

  const fetchTurns = async () => {
    try {
      const data = await getAllTurns();
      setTurns(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load turns.');
      toast.error('Error al cargar los turnos.');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurns();
  }, []);

  const handleEditClick = (turn) => {
    const formattedTurn = {
      ...turn,
      start_time: turn.start_time.slice(0, 5),
      end_time: turn.end_time.slice(0, 5),
    };
    setCurrentTurn(formattedTurn);
    setShowEditModal(true);
  };

  const handleDeactivateClick = (idTurn) => {
    setTurnToDeactivate(idTurn);
    setShowConfirmModal(true);
  };

  const handleDeactivateConfirm = async () => {
    try {
      await deactivateTurn(turnToDeactivate);
      toast.success('Turno inactivado exitosamente.');
      fetchTurns();
    } catch (err) {
      toast.error(`Error al inactivar turno: ${err.message}`);
      console.error('Failed to deactivate turn:', err);
    } finally {
      setShowConfirmModal(false);
      setTurnToDeactivate(null);
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentTurn((prev) => ({
      ...prev,
      [name]: name === 'max_capacity' ? Number(value) : value,
    }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTurn(currentTurn.id_turn, currentTurn);
      toast.success('Turno actualizado exitosamente.');
      setShowEditModal(false);
      fetchTurns();
    } catch (err) {
      toast.error(`Error al actualizar turno: ${err.message}`);
      console.error('Failed to update turn:', err);
    }
  };

  if (loading) return <div className="text-center p-4">Cargando turnos...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error: {error}</div>;

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
      <div className="flex flex-col items-center justify-center p-4 flex-grow pb-63">
        <div className="max-w-6xl w-full space-y-8">
          {/* Logo */}
          <LogoDisplay src={logoUPTC} alt="UPTC Logo" />

          {/* Título */}
          <h1 id="list-turns-title" className="text-3xl font-bold text-center text-[var(--color-primary)]">Lista de Turnos</h1>

          {/* Tabla de turnos */}
          {turns.length === 0 ? (
            <p className="text-center text-gray-600">No hay turnos registrados.</p>
          ) : (
            <table id="turns-table" className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th id="column-day" className="py-2 px-4 text-left">Día</th>
                  <th id="column-start-time" className="py-2 px-4 text-left">Inicio</th>
                  <th id="column-end-time" className="py-2 px-4 text-left">Fin</th>
                  <th id="column-max-capacity" className="py-2 px-4 text-left">Capacidad Máx.</th>
                  <th id="column-status" className="py-2 px-4 text-left">Estado</th>
                  <th id="column-color" className="py-2 px-4 text-left">Color</th>
                  <th id="column-actions" className="py-2 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {turns.map((turn) => (
                  <tr key={turn.id_turn} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{turn.day}</td>
                    <td className="py-2 px-4">{turn.start_time}</td>
                    <td className="py-2 px-4">{turn.end_time}</td>
                    <td className="py-2 px-4">{turn.max_capacity}</td>
                    <td className="py-2 px-4">{turn.status}</td>
                    <td className="py-2 px-4">
                      <div style={{ backgroundColor: turn.color_turn, width: '20px', height: '20px', borderRadius: '4px' }}></div>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        id={`edit-button-${turn.id_turn}`} 
                        onClick={() => handleEditClick(turn)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Editar
                      </button>
                      {turn.status !== 'inactive' && (
                        <button
                        id={`deactivate-button-${turn.id_turn}`} // Added ID
                          onClick={() => handleDeactivateClick(turn.id_turn)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Inactivar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <ConfirmationModal
          title="Confirmar Inactivación"
          message="¿Estás seguro de que quieres inactivar este turno?"
          onConfirm={handleDeactivateConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {/* Modal de Edición */}
      {showEditModal && createPortal(
        <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {/* Logo */}
            <LogoDisplay src={logoUPTC} alt="UPTC Logo" className="mx-auto mb-4" />

            {/* Título */}
            <h1 className="text-3xl font-bold text-center text-yellow-500">Editar Turno</h1>

            {/* Formulario */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Día:</label>
                <select
                  name="day"
                  value={currentTurn.day}
                  onChange={handleModalChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hora de inicio (HH:MM):</label>
                <input
                  type="time"
                  name="start_time"
                  value={currentTurn.start_time}
                  onChange={handleModalChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hora de fin (HH:MM):</label>
                <input
                  type="time"
                  name="end_time"
                  value={currentTurn.end_time}
                  onChange={handleModalChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Capacidad Máxima:</label>
                <input
                  type="number"
                  name="max_capacity"
                  value={currentTurn.max_capacity}
                  onChange={handleModalChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Estado:</label>
                <select
                  name="status"
                  value={currentTurn.status}
                  onChange={handleModalChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Color del Turno:</label>
                <input
                  type="color"
                  name="color_turn"
                  value={currentTurn.color_turn}
                  onChange={handleModalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
            className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>,
  document.body
)}

{/* Footer */}
<Footer />

    </div>
  );
}

export default ListTurnsPage;