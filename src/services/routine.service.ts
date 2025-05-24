import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface RoutineStep {
  id: number;
  step: string;
  time: string;
}

export interface RoutineLog {
  id: string;
  userId: string;
  steps: number[];
  date: string;
  points: number;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const routineService = {
  async logRoutineProgress(userId: string, steps: number[], isNight: boolean): Promise<RoutineLog> {
    try {
      const response = await api.post('/user-routine-logs/log', {
        userId,
        steps,
        isNight,
        date: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error logging routine progress:', error);
      throw new Error('Failed to log routine progress. Please try again.');
    }
  },

  async getRoutineStats(userId: string) {
    try {
      // First get the user's active routines
      const activeRoutines = await this.getActiveRoutines(userId);
      
      if (!activeRoutines || activeRoutines.length === 0) {
        // Return default stats if no active routine is found
        return {
          totalPoints: 0,
          logs: [],
          streak: 0
        };
      }

      // Get stats for the first active routine
      const response = await api.get(`/user-routine-logs/stats/${activeRoutines[0].id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting routine stats:', error);
      // Return default stats if the endpoint is not available yet
      return {
        totalPoints: 0,
        logs: [],
        streak: 0
      };
    }
  },

  async getActiveRoutines(userId: string) {
    try {
      const response = await api.get(`/user-routines/active/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting active routines:', error);
      return [];
    }
  },

  async uploadProgressPhoto(userId: string, photo: File) {
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('userId', userId);
      
      const response = await api.post('/routine-progress/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading progress photo:', error);
      throw new Error('Failed to upload progress photo. Please try again.');
    }
  }
}; 