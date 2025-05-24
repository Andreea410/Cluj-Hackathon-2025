import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API
export const userApi = {
  register: async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    console.log('Sending registration request with data:', {
      ...userData,
      password: '[REDACTED]'
    });
    try {
      const response = await api.post('/users', {
        email: userData.email,
        password: userData.password,
        first_name: userData.first_name,
        last_name: userData.last_name
      });
      console.log('Registration response:', response.data);
      return response;
    } catch (error) {
      console.error('Registration API error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  getProfile: () => api.get('/users/profile')
};

// Skin Analysis API
export const skinAnalysisApi = {
  startAnalysis: () => api.post('/skin-analysis/start'),

  submitResponse: (message: string) =>
    api.post('/skin-analysis/respond', { message }),

  getHistory: () => api.get('/skin-analysis/history')
};

export const skinProfileApi = {
  create: (profileData: any) => api.post('/skin-profiles', profileData),
  get: (userId: string) => api.get(`/skin-profiles/${userId}`),
  update: (userId: string, profileData: any) =>
    api.put(`/skin-profiles/${userId}`, profileData)
};

export const skincareRoutineApi = {
  create: (routineData: any) => api.post('/skincare-routines', routineData),
  get: (userId: string) => api.get(`/skincare-routines/${userId}`),
  update: (userId: string, routineData: any) =>
    api.put(`/skincare-routines/${userId}`, routineData)
};

export const photoAnalysisApi = {
  upload: (formData: FormData) =>
    api.post('/photo-analysis/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  get: (userId: string) => api.get(`/photo-analysis/${userId}`)
}; 