import axios from "axios";

const FRIENDSHIP_API_BASE_URL =
  import.meta.env.VITE_FRIENDSHIP_API_URL || "http://localhost:3001/api";

class FriendshipService {
  constructor() {
    this.api = axios.create({
      baseURL: FRIENDSHIP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor para manejo de errores
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error.response?.data?.message || error.message || "Error de conexión";
        throw new Error(message);
      }
    );
  }

  /**
   * Envía una solicitud de amistad
   */
  async sendFriendRequest(senderId, receiverId) {
    try {
      const response = await this.api.post("/friendships/requests", {
        senderId,
        receiverId,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error enviando solicitud de amistad: ${error.message}`);
    }
  }

  /**
   * Acepta una solicitud de amistad
   */
  async acceptFriendRequest(requestId) {
    try {
      const response = await this.api.patch(
        `/friendships/requests/${requestId}/accept`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error aceptando solicitud: ${error.message}`);
    }
  }

  /**
   * Rechaza una solicitud de amistad
   */
  async rejectFriendRequest(requestId) {
    try {
      const response = await this.api.patch(
        `/friendships/requests/${requestId}/reject`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error rechazando solicitud: ${error.message}`);
    }
  }

  /**
   * Obtiene las solicitudes pendientes de un estudiante
   */
  async getPendingRequests(studentId) {
    try {
      const response = await this.api.get(
        `/friendships/requests/pending/${studentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Error obteniendo solicitudes pendientes: ${error.message}`
      );
    }
  }

  /**
   * Obtiene la lista de amigos de un estudiante
   */
  async getFriends(studentId) {
    try {
      const response = await this.api.get(`/friendship/${studentId}/friends`);
      return response.data;
    } catch (error) {
      throw new Error(`Error obteniendo amigos: ${error.message}`);
    }
  }

  /**
   * Procesa la asistencia para actualizar rachas
   */
  async processAttendance(studentId, attendanceDate) {
    try {
      const response = await this.api.post("/friendship/attendance", {
        studentId,
        attendanceDate,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error procesando asistencia: ${error.message}`);
    }
  }

  /**
   * Obtiene el ranking global de rachas
   */
  async getGlobalRanking() {
    try {
      const response = await this.api.get("/friendship/ranking/global");
      return response.data;
    } catch (error) {
      throw new Error(`Error obteniendo ranking: ${error.message}`);
    }
  }
}

export default new FriendshipService();
