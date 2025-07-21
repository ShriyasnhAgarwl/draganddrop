import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Schema API
export const saveSchema = async (name, schema) => {
  const response = await api.post('/save-schema', { name, schema });
  return response.data;
};

export const loadSchema = async (id) => {
  const response = await api.get(`/load-schema/${id}`);
  return response.data;
};

export const fetchSchemas = async () => {
  const response = await api.get('/schemas');
  return response.data;
};

// Form submission API
export const submitForm = async (schemaId, formData) => {
  const response = await api.post('/submit-form', { schemaId, formData });
  return response.data;
};

export const fetchSubmissions = async (schemaId = null) => {
  const url = schemaId ? `/submissions/${schemaId}` : '/submissions';
  const response = await api.get(url);
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;