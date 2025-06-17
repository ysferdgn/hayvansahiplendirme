import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Pet Service
export const petService = {
  getAllPets: async () => {
    const response = await api.get('/pets');
    return response.data;
  },
  getPetById: async (id) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },
  getUserPets: async () => {
    const response = await api.get('/pets/my');
    return response.data;
  },
  createPet: async (petData) => {
    const formData = new FormData();
    Object.keys(petData).forEach(key => {
      formData.append(key, petData[key]);
    });
    const response = await api.post('/pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updatePet: async (id, petData) => {
    const formData = new FormData();
    Object.keys(petData).forEach(key => {
      formData.append(key, petData[key]);
    });
    const response = await api.put(`/pets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deletePet: async (id) => {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  },
};

export default api; 