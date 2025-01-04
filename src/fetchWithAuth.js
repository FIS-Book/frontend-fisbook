// src/fetchWithAuth.js

const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      // Si el token está expirado, eliminamos el token y redirigimos al login
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Token expired, please log in again.');
    }
  
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
  
    return response.json();
  };
  
  export default fetchWithAuth;
  