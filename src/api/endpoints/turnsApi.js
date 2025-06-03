// src/api/turnsApi.js
const API_BASE_URL = import.meta.env.VITE_TURNS_API_BASE_URL;

export const createTurn = async (turnData) => {
    try {
        console.log('Creating turn with data:', turnData);
        console.log('API_BASE_URL:', API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/turns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turnData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create turn.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating turn:', error);
        throw error;
    }
};

export const getAllTurns = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/turns`);
        if (!response.ok) {
            throw new Error('Failed to fetch turns.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching turns:', error);
        throw error;
    }
};

// Obtener un turno por ID (útil para la edición)
export const getTurnById = async (idTurn) => {
    try {
        const response = await fetch(`${API_BASE_URL}/turns/${idTurn}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch turn with ID ${idTurn}.`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching turn with ID ${idTurn}:`, error);
        throw error;
    }
};

// Actualizar un turno (editar)
export const updateTurn = async (idTurn, turnData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/turns/${idTurn}`, {
            method: 'PUT', // O 'PATCH' si tu backend usa PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turnData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to update turn with ID ${idTurn}.`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating turn with ID ${idTurn}:`, error);
        throw error;
    }
};

// Inactivar un turno (eliminar lógico)
export const deactivateTurn = async (idTurn) => {
    try {
        const response = await fetch(`${API_BASE_URL}/turns/${idTurn}`, {
            method: 'DELETE', // Método DELETE para desactivar el turno
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta es 204 No Content
        if (response.status !== 204) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to deactivate turn with ID ${idTurn}.`);
        }

        // Retornar un mensaje de éxito o simplemente undefined
        return { message: `Turn with ID ${idTurn} deactivated successfully.` };
    } catch (error) {
        console.error(`Error deactivating turn with ID ${idTurn}:`, error);
        throw error;
    }
};