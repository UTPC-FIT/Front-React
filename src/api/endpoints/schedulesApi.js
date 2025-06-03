// src/api/schedulesApi.js
const API_BASE_URL = import.meta.env.VITE_TURNS_API_BASE_URL;

export const createSchedule = async (scheduleData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/schedules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create schedule.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
};

export const getTurnStudents = async (turnId, date = null) => {
    let url = `${API_BASE_URL}/turns/${turnId}/students`;
    if (date== 'current') {
        url += '/current';
    }else{
        url += `?date=${date}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch turn students.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching turn students:', error);
        throw error;
    }
};

export const markAttendance = async (studentId, officialId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/schedules/attendance/mark`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student_id: studentId, official_id: officialId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to mark attendance.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error marking attendance:', error);
        throw error;
    }
};

export const cancelSchedule = async (studentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/schedules/attendance/cancel`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student_id: studentId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to cancel schedule.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error cancelling schedule:', error);
        throw error;
    }
};