import axios from "axios";

export const API_BASE_URL = 'http://localhost:5454';

export const api = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to dynamically add JWT token
api.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem("jwt");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

