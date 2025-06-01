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