/* This hook provides utility functions to manage user authentication and authorization in the application. */

import axios from "axios";
import decodeToken from "../utils/jwtDecode";

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
  
    const decoded = decodeToken(token); 
    return decoded ? decoded.rol : null;
};

export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded;
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token); // Usa la función decodificadora
  return decoded ? decoded._id : null;
};

export const getUserMail = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token); // Usa la función decodificadora
  return decoded ? decoded.email : null;
};

export const requestWithAuth = async (url, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url,               
      method: options.method || 'GET',
      headers,
      data: options.data,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; 
      throw new Error('Token expirado. Por favor, inicia sesión de nuevo.');
    }
    
    return error.response ? error.response : { message: 'Error en la solicitud' };
  }
};
