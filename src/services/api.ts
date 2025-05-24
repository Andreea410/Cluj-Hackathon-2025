import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this to match your backend URL

export const api = {
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await axios.post(`${API_URL}/users`, {
      email: userData.email,
      hashed_password: userData.password, // The backend will hash this
      role_id: 'user', // You might want to adjust this based on your role system
    });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/users/validate`, {
      email,
      password,
    });
    return response.data;
  },
}; 