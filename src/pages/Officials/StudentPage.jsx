// StudentPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiUsers, FiFileText, FiCalendar, FiArrowLeft, FiDownload, FiEdit3, FiCheck, FiX, FiEye } from "react-icons/fi"; // ✨ Agrega FiEye para el ícono de ver ✨

import Text from '@atoms/Text';
import StatusBadge from '@molecules/StatusBadge';
import ButtonWithIcon from '@molecules/ButtonWithIcon';
import useStudents from '@hooks/useStudents';
import OfficialTemplate from '@templates/OfficialTemplate';

const STATUS_OPTIONS = [
    { value: 'active', label: 'Activo', color: 'bg-green-100 text-green-800' },
    { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'inactive', label: 'Inactivo', color: 'bg-red-100 text-red-800' },
    { value: 'unregister', label: 'No Registrado', color: 'bg-gray-100 text-gray-800' }
];

export default function StudentPage() {
    const [student, setStudent] = useState(null);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null); // ✨ Nuevo estado para la URL del PDF ✨
    const [showPdfViewer, setShowPdfViewer] = useState(false); // ✨ Nuevo estado para controlar la visibilidad del visor ✨

    const { studentId } = useParams();
    const navigate = useNavigate();
    const { getFullStudent, loading, changeRoleStudent, getStudentConsentPdf } = useStudents(); // ✨ Importa getStudentConsentPdf ✨

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const result = await getFullStudent(studentId);
                setStudent(result);
                setSelectedStatus(result.status);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudent();
    }, [studentId]); // Agrega studentId como dependencia para re-fetch si cambia

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatName = (firstName, lastName) => {
        return `${firstName} ${lastName}`
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleDownloadConsent = () => {
        // Esta función podría usarse para la descarga directa si el backend lo permite
        // Pero para la visualización en la misma página, usaremos handleViewConsent
        if (student?.consent?.fileUrl) {
            window.open(student.consent.fileUrl, '_blank');
        }
    };

    // ✨ Nueva función para ver el PDF ✨
    const handleViewConsent = async () => {
        if (studentId) {
            const url = await getStudentConsentPdf(studentId);
            if (url) {
                setPdfUrl(url);
                setShowPdfViewer(true);
            }
        }
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl); // Libera la URL del Blob para evitar fugas de memoria
            setPdfUrl(null);
        }
    };

    const handleEditStatus = () => {
        setIsEditingStatus(true);
        setSelectedStatus(student.status);
    };

    const handleCancelEditStatus = () => {
        setIsEditingStatus(false);
        setSelectedStatus(student.status);
    };

    const handleSaveStatus = async () => {
        if (selectedStatus === student.status) {
            setIsEditingStatus(false);
            return;
        }

        setIsChangingStatus(true);
        try {
            await changeRoleStudent({
                studentId: student.studentId,
                newRole: selectedStatus
            });

            // Actualizar el estado local del estudiante
            setStudent(prev => ({ ...prev, status: selectedStatus }));
            setIsEditingStatus(false);
        } catch (error) {
            console.error('Error changing status:', error);
            // Revertir el estado seleccionado si hay error
            setSelectedStatus(student.status);
        } finally {
            setIsChangingStatus(false);
        }
    };

    const getStatusOption = (status) => {
        return STATUS_OPTIONS.find(option => option.value === status) || STATUS_OPTIONS[0];
    };

    if (loading && !student) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <Text>Cargando información del estudiante...</Text>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Text className="text-red-600 text-lg mb-4">
                    No se pudo cargar la información del estudiante
                </Text>
                <ButtonWithIcon
                    IconComponent={FiArrowLeft}
                    iconPosition="left"
                    onClick={() => navigate("/officials")}
                >
                    Volver
                </ButtonWithIcon>
            </div>
        );
    }

    const fullName = formatName(student.firstName, student.lastName);

    return (
        <OfficialTemplate>
            <div className="min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <ButtonWithIcon
                            IconComponent={FiArrowLeft}
                            iconPosition="left"
                            onClick={() => navigate("/officials")}
                        >
                            Volver
                        </ButtonWithIcon>
                        <div className="text-right">
                            <Text className="text-sm text-gray-500">ID del Estudiante</Text>
                            <Text className="text-xs font-mono text-gray-400">{student.studentId}</Text>
                        </div>
                    </div>

                    {/* Main Info Card (código omitido por brevedad, es el mismo que tienes) */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                                    <FiUser className="w-8 h-8 text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-[var(--color-neutral-gray-blue)] mb-1">
                                        {fullName}
                                    </h1>
                                    <Text className="text-gray-600">{student.email}</Text>
                                </div>
                            </div>

                            {/* Status Section with Edit Functionality */}
                            <div className="flex items-center space-x-3">
                                {isEditingStatus ? (
                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                            disabled={isChangingStatus}
                                        >
                                            {STATUS_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={handleSaveStatus}
                                            disabled={isChangingStatus}
                                            className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
                                            title="Guardar cambios"
                                        >
                                            {isChangingStatus ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                            ) : (
                                                <FiCheck className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancelEditStatus}
                                            disabled={isChangingStatus}
                                            className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                            title="Cancelar"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <StatusBadge status={student.status} />
                                        <button
                                            onClick={handleEditStatus}
                                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                            title="Editar estado"
                                        >
                                            <FiEdit3 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FiUser className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <Text className="text-sm text-gray-500">Código Estudiantil</Text>
                                        <Text className="font-semibold">{student.studentCode || 'N/A'}</Text>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FiMail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <Text className="text-sm text-gray-500">Correo Electrónico</Text>
                                        <Text className="font-semibold">{student.email}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status History or Additional Info */}
                        {isEditingStatus && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <Text className="text-sm text-blue-800">
                                    <strong>Cambiar estado:</strong> Esta acción cambiará el estado del estudiante y puede afectar su acceso a la plataforma.
                                </Text>
                                <div className="mt-2 text-xs text-blue-600">
                                    <div><strong>Activo:</strong> El estudiante puede acceder a todas las funciones</div>
                                    <div><strong>Pendiente:</strong> El estudiante está en proceso de verificación</div>
                                    <div><strong>Inactivo:</strong> El estudiante no puede acceder a la plataforma</div>
                                    <div><strong>No Registrado:</strong> El estudiante debe completar su registro</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Emergency Contacts (código omitido por brevedad, es el mismo que tienes) */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-[var(--color-neutral-gray-blue)] border-b pb-3">
                            <FiUsers className="inline w-5 h-5 mr-2" />
                            Contactos de Emergencia
                        </h2>

                        {student.emergencyContacts && student.emergencyContacts.length > 0 ? (
                            <div className="space-y-4">
                                {student.emergencyContacts.map((contact, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <FiUser className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <Text className="text-sm text-gray-500">Nombre</Text>
                                                    <Text className="font-semibold">{contact.name}</Text>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <FiPhone className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <Text className="text-sm text-gray-500">Teléfono</Text>
                                                    <Text className="font-semibold">{contact.phoneNumber}</Text>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <FiUsers className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <Text className="text-sm text-gray-500">Parentesco</Text>
                                                    <Text className="font-semibold capitalize">{contact.relationship}</Text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FiUsers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <Text className="text-gray-500">No hay contactos de emergencia registrados</Text>
                            </div>
                        )}
                    </div>

                    {/* Consent Information */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-[var(--color-neutral-gray-blue)] border-b pb-3">
                            <FiFileText className="inline w-5 h-5 mr-2" />
                            Información de Consentimiento
                        </h2>

                        {student.consent ? (
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${student.consent.approved ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}></div>
                                            <div>
                                                <Text className="text-sm text-gray-500">Estado</Text>
                                                <Text className="font-semibold">
                                                    {student.consent.approved ? 'Aprobado' : 'Pendiente de Aprobación'}
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <FiCalendar className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <Text className="text-sm text-gray-500">Fecha de Creación</Text>
                                                <Text className="font-semibold">
                                                    {formatDate(student.consent.createdAt)}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>

                                    {student.consent.approvedAt && (
                                        <div className="mt-4 flex items-center space-x-3">
                                            <FiCalendar className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <Text className="text-sm text-gray-500">Fecha de Aprobación</Text>
                                                <Text className="font-semibold">
                                                    {formatDate(student.consent.approvedAt)}
                                                </Text>
                                            </div>
                                        </div>
                                    )}

                                    {/* ✨ Botones para ver y descargar el PDF ✨ */}
                                    <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
                                        <ButtonWithIcon
                                            variant="secondary"
                                            IconComponent={FiEye} // Icono para ver
                                            iconPosition="left"
                                            onClick={handleViewConsent}
                                            disabled={loading} // Deshabilitar si se está cargando el PDF
                                        >
                                            Ver Documento de Consentimiento
                                        </ButtonWithIcon>
                                        {/* <ButtonWithIcon
                                            variant="tertiary" // Un estilo diferente para la descarga
                                            IconComponent={FiDownload}
                                            iconPosition="left"
                                            onClick={handleDownloadConsent}
                                            disabled={!student.consent.fileUrl} // Deshabilitar si no hay URL de descarga
                                        >
                                            Descargar
                                        </ButtonWithIcon> */}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <Text className="text-gray-500">No hay información de consentimiento disponible</Text>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✨ Visor de PDF (Modal o Componente overlay) ✨ */}
                {showPdfViewer && pdfUrl && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Documento de Consentimiento</h3>
                                <button
                                    onClick={handleClosePdfViewer}
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                    title="Cerrar"
                                >
                                    <FiX className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                            <div className="flex-grow overflow-hidden">
                                {/* Usa el <iframe> para incrustar el PDF. Asegúrate de que la URL sea un Blob URL */}
                                <iframe
                                    src={pdfUrl}
                                    title="Consentimiento del Estudiante"
                                    className="w-full h-full border-0"
                                    type="application/pdf"
                                    allowFullScreen
                                >
                                    Tu navegador no soporta la visualización de PDFs.
                                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Descarga el PDF aquí</a>.
                                </iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </OfficialTemplate>
    );
}