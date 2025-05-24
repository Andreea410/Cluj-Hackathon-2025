import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await axios.post(`${API_URL}/users`, {
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName,
      role_id: 'user'
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