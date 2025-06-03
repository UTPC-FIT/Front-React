// @hooks/useStudents.js
import { useState, useEffect } from 'react';
import { getStudents, getStudentInscriptionInfoById, getStudentById, changeStatusStudent, getConsentPdf } from '@/services/studentsService'; // ✨ Importa getConsentPdf ✨

import { ApiError } from '@/utils/ApiError';
import { toast } from 'react-toastify';

export default function useStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getStudents();
                setStudents(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const getFullStudent = async (studentId) => {
        try {
            setLoading(true);
            const inscriptionInfo = await getStudentInscriptionInfoById(studentId);
            const student = await getStudentById(studentId);

            return { ...student, ...inscriptionInfo };
        } catch (error) {
            console.error('Error fetching student:', error);
            throw new ApiError('Error fetching student inscription info', 500);
        } finally {
            setLoading(false);
        }
    };

    const changeRoleStudent = async ({ studentId, newRole }) => {
        try {
            setLoading(true);
            const result = await changeStatusStudent({ studentId, newStatus: newRole });

            // Actualizar la lista local de estudiantes si existe
            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.studentId === studentId
                        ? { ...student, status: newRole }
                        : student
                )
            );

            toast.success("Estado actualizado correctamente.");
            return result;
        } catch (error) {
            console.error('Error changing student status:', error);
            toast.error("Algo salió mal al intentar cambiar el estado, vuelve a intentar luego.");
            throw error; // Re-throw para que el componente pueda manejarlo
        } finally {
            setLoading(false);
        }
    };

    const getStudentConsentPdf = async (studentId) => {
        setLoading(true); // O puedes usar un loading específico para el PDF
        try {
            const pdfBlob = await getConsentPdf(studentId);
            // Crea una URL para el Blob que se puede usar en un <iframe>
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return pdfUrl;
        } catch (error) {
            console.error('Error fetching consent PDF:', error);
            toast.error("No se pudo cargar el documento de consentimiento.");
            return null; // Retorna null en caso de error
        } finally {
            setLoading(false);
        }
    };

    return {
        students,
        loading,
        error,
        getFullStudent,
        changeRoleStudent,
        getStudentConsentPdf // ✨ Exporta la nueva función ✨
    };
}