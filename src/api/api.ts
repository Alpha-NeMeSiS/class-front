// src/api/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5148/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // si tu utilises des cookies ou une auth persistante
});

export default api;
