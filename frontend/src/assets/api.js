import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request se pehle token add karne ke liye (Auth)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = () => api.get('/posts/');
export const createPost = (data) => api.post('/post/create/', data);
export const updatePost = (pk, data) => api.put(`/post/update/${pk}/`, data);
export const deletePost = (pk) => api.delete(`/delete/${pk}/`);