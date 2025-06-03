import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { driver } from 'driver.js';
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { useAuth } from '@context/AuthContext';

const ButtonHelp = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        if (user) {
            // Usa location.pathname para determinar la ruta actual
            console.log("Ruta actual:", location.pathname);
            switch (location.pathname) {
                case '/officials':
                    setSteps([
                        { element: '#demo-theme', popover: { title: '¡Bienvenido ' + user.username + '!', description: 'Esta es la lista de estudiantes inscritos en el CAF de la Universidad Pedagógica y Tecnológica de Colombia, Sede Central.', side: "bottom", align: 'start' } },
                        { element: '#search-bar', popover: { title: 'Barra de Búsqueda', description: 'Acá podrás introducir el nombre del estudiante o el código estudiantil para encontrarlo.', side: "bottom", align: 'start' } },
                        { element: '#filter', popover: { title: 'Filtro', description: 'Acá podrás filtrar los estudiantes por el estado de su inscripción: si se encuentra pendiente, o si el estudiante es activo o inactivo.', side: "left", align: 'start' } },
                        { element: '#column_fullname', popover: { title: 'Nombre completo', description: 'En esta columna encontrarás el nombre completo de cada estudiante.', side: "top", align: 'start' } },
                        { element: '#column', popover: { title: 'Código estudiantil', description: 'En esta columna encontrarás el código estudiantil de cada estudiante.', side: "top", align: 'start' } },
                        { element: '#column_email', popover: { title: 'Correo electrónico', description: 'En esta columna encontrarás el correo electrónico de cada estudiante.', side: "top", align: 'start' } },
                        { element: '#column_phoneNumber', popover: { title: 'Número de teléfono', description: 'En esta columna encontrarás el número de teléfono de cada estudiante.', side: "top", align: 'start' } },
                        { element: '#column_status', popover: { title: 'Estado', description: 'En esta columna encontrarás el estado de inscripción de cada estudiante, si se encuentra pendiente, o si la inscripción del estudiantes está activa o inactiva.', side: "top", align: 'start' } },
                        { element: '#column_actions', popover: { title: 'Acciones', description: 'En esta columna encontrarás las acciones disponibles, como modificar o deshabilitar.', side: "top", align: 'start' } },
                        { element: '#details', popover: { title: 'Ver Detalles', description: 'Haz clic sobre cualquier fila de estudiantes para poder ver los detalles de inscripción por estudiante.', side: "top", align: 'start' } },
                        { element: '#button_modify', popover: { title: 'Modificar', description: 'Haz clic aquí para modificar la información del estudiante.', side: "top", align: 'start' } },
                        { element: '#button_delete', popover: { title: 'Eliminar', description: 'Haz clic aquí para deshabilitar un estudiante.', side: "top", align: 'start' } }
                    ]);
                    break;
                case '/turn': // Nuevo caso para la página de creación de turnos
                    setSteps([
                        {
                            element: '#create-turn-tittle',
                            popover: {
                                title: 'Crear Turno',
                                description: 'Aquí puedes crear turnos para el CAF',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-day-select',
                            popover: {
                                title: 'Seleccionar Día',
                                description: 'Aquí puedes elegir el día de la semana para el nuevo turno.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-start-time-input',
                            popover: {
                                title: 'Hora de Inicio',
                                description: 'Introduce la hora en la que comenzará el turno.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-end-time-input', // Asumiendo que le añades este ID
                            popover: {
                                title: 'Hora de Fin',
                                description: 'Define la hora en la que terminará el turno.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-max-capacity-input', // Asumiendo que le añades este ID
                            popover: {
                                title: 'Capacidad Máxima',
                                description: 'Establece la cantidad máxima de estudiantes que pueden inscribirse a este turno.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-status-select', // Asumiendo que le añades este ID
                            popover: {
                                title: 'Estado del Turno',
                                description: 'Selecciona si el turno estará activo o inactivo.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#turn-color-input', // Asumiendo que le añades este ID
                            popover: {
                                title: 'Color del Turno',
                                description: 'Elige un color para identificar visualmente este turno.',
                                side: 'right',
                                align: 'center'
                            }
                        },
                        {
                            element: '#create-turn-button',
                            popover: {
                                title: 'Crear Turno',
                                description: 'Haz clic aquí para guardar el nuevo turno.',
                                side: 'top',
                                align: 'center'
                            }
                        }
                    ]);
                    break;
                case '/list': // New case for ListTurnsPage
                    setSteps([
                        { element: '#list-turns-title', popover: { title: 'Lista de Turnos', description: 'Aquí puedes ver y gestionar todos los turnos del CAF.', side: "bottom", align: 'center' } },
                        { element: '#turns-table', popover: { title: 'Tabla de Turnos', description: 'Esta tabla muestra todos los turnos registrados con sus detalles.', side: "top", align: 'start' } },
                        { element: '#column-day', popover: { title: 'Día', description: 'El día de la semana en que se realiza el turno.', side: "top", align: 'center' } },
                        { element: '#column-start-time', popover: { title: 'Hora de Inicio', description: 'La hora en que comienza el turno.', side: "top", align: 'center' } },
                        { element: '#column-end-time', popover: { title: 'Hora de Fin', description: 'La hora en que termina el turno.', side: "top", align: 'center' } },
                        { element: '#column-max-capacity', popover: { title: 'Capacidad Máxima', description: 'El número máximo de estudiantes que pueden inscribirse en este turno.', side: "top", align: 'center' } },
                        { element: '#column-status', popover: { title: 'Estado', description: 'Indica si el turno está activo o inactivo.', side: "top", align: 'center' } },
                        { element: '#column-color', popover: { title: 'Color', description: 'Un color asociado visualmente al turno.', side: "top", align: 'center' } },
                        { element: '#column-actions', popover: { title: 'Acciones', description: 'Aquí puedes editar o inactivar un turno.', side: "top", align: 'center' } },
                        { element: '#edit-button-1', popover: { title: 'Botón Editar', description: 'Haz clic aquí para modificar los detalles de un turno. (Ejemplo con el primer turno).', side: "left", align: 'start' } },
                        { element: '#deactivate-button-1', popover: { title: 'Botón Inactivar', description: 'Haz clic aquí para cambiar el estado de un turno a inactivo. (Ejemplo con el primer turno).', side: "left", align: 'start' } },
                        // Note: For dynamically generated elements like buttons in a map,
                        // you might need to use a more generic selector or ensure the ID is on a unique parent.
                        // I've used `edit-button-1` and `deactivate-button-1` as examples,
                        // assuming the first row's buttons will always be present for a demo.
                        // For production, you might want to highlight a more general area or handle cases
                        // where there are no turns.
                    ]);
                    break;
                case '/validate': // Nuevo caso para ValidateAttendancePage
                    setSteps([
                        { element: '#validate-attendance-title', popover: { title: 'Validar Asistencia', description: 'Aquí puedes validar la asistencia de los estudiantes en los turnos.', side: "bottom", align: 'center' } },
                        { element: '#official-id-input', popover: { title: 'ID Oficial', description: 'Introduce tu ID oficial para poder validar la asistencia.', side: "right", align: 'center' } },
                        { element: '#turn-select', popover: { title: 'Seleccionar Turno', description: 'Elige el turno para el cual deseas validar la asistencia.', side: "right", align: 'center' } },
                        { element: '#students-list-title', popover: { title: 'Lista de Estudiantes', description: 'Aquí se muestran los estudiantes programados para el turno seleccionado.', side: "top", align: 'center' } },
                        { element: '#mark-attendance-button-1', popover: { title: 'Marcar Asistencia', description: 'Haz clic aquí para marcar la asistencia de un estudiante.', side: "left", align: 'center' } },
                        { element: '#cancel-schedule-button-1', popover: { title: 'Cancelar Programación', description: 'Haz clic aquí para cancelar la programación de un estudiante.', side: "left", align: 'center' } },
                    ]);
                    break;
                case '/schedule': // Nuevo caso para AssignSchedulePage
                    setSteps([
                        {
                            element: '#assign-title',
                            popover: {
                                title: 'Asignarte a un Turno',
                                description: 'Aquí puedes asignarte a un turno disponible.',
                                side: 'bottom',
                                align: 'center',
                            },
                        },
                        {
                            element: '#student-id-input',
                            popover: {
                                title: 'ID de Estudiante',
                                description: 'Este es tu ID de estudiante. Está prellenado y no se puede modificar.',
                                side: 'right',
                                align: 'center',
                            },
                        },
                        {
                            element: '#turn-select',
                            popover: {
                                title: 'Seleccionar Turno',
                                description: 'Elige un turno disponible de la lista desplegable.',
                                side: 'right',
                                align: 'center',
                            },
                        },
                        {
                            element: '#assign-button',
                            popover: {
                                title: 'Asignarte al Turno',
                                description: 'Haz clic aquí para asignarte al turno seleccionado.',
                                side: 'top',
                                align: 'center',
                            },
                        },
                    ]);
                    break;
                // Puedes añadir más casos para otras rutas:
                // case '/another-page':
                //     setSteps([ /* ... pasos para esta página ... */ ]);
                //     break;
                default:
                    setSteps([]);
                    break;
            }
        }
    }, [user, location.pathname]);

    const startTour = () => {
        console.log("Ruta actual:", location.pathname);
        // Asegúrate de que hay pasos definidos antes de iniciar el tour
        if (steps.length === 0) {
            console.warn("No hay pasos de tour definidos para esta página.");
            return;
        }

        const currentDriverObj = driver({ // Crea una nueva instancia del driver cada vez que se inicia el tour
            showProgress: true,
            popoverClass: 'driverjs-theme',
            nextBtnText: 'Siguiente »',
            prevBtnText: '« Anterior',
            doneBtnText: 'Listo ✓',
            progressText: "{{current}} de {{total}}",
            steps: steps // Pasa los pasos definidos en el estado
        });

        currentDriverObj.drive();
        // driver.js ya iniciará con el primer paso de 'steps',
        // por lo que el highlight separado para '#demo-theme' probablemente no es necesario aquí.
        // Si quieres que el tour *siempre* empiece por #demo-theme independientemente
        // de 'steps', podrías mantenerlo, pero suele ser redundante.
        // currentDriverObj.highlight({
        //     element: '#demo-theme',
        //     popover: {
        //         title: '¡Bienvenido ' + user.username + '!',
        //         description: 'Esta es la lista de estudiantes inscritos en el CAF de la Universidad Pedagógica y Tecnológica de Colombia, Sede Central.',
        //         side: "bottom", align: 'start'
        //     }
        // });
    };

    return (
        <button
            onClick={startTour}
            className="cursor-pointer bg-[var(--color-neutral-gray-dark)] text-[var(--color-primary-light)] p-4 rounded text-4xl"
            // Deshabilita el botón si no hay pasos de tour para la página actual
            disabled={steps.length === 0}
            title={steps.length === 0 ? "No hay un tour de ayuda disponible para esta página." : "Iniciar tour de ayuda"}
        >
            <TbHelpSquareRoundedFilled />
        </button>
    );
};

export default ButtonHelp;