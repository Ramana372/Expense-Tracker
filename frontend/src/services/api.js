import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});
export const registerUser = (userData) => api.post('/api/register', userData);

export const loginUser = (credentials) => api.post('/api/login', credentials);

export const getTransactions = () => {
  const token = localStorage.getItem('token');
  return api.get('/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
};

export const addTransaction = (transaction) => {
  const token = localStorage.getItem('token');
  return api.post('/api/transactions', transaction, { headers: { Authorization: `Bearer ${token}` } });
};

export default api;
