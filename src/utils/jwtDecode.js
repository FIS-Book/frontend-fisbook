/* This util function decodes a JWT token and returns the payload. */

import { jwtDecode } from 'jwt-decode';

const decodeToken = (token) => {
  try {
    return jwtDecode(token); 
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null; 
  }
};

export default decodeToken;

