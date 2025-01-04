import { jwtDecode } from 'jwt-decode';

const decodeToken = (token) => {
  try {
    return jwtDecode(token); // Devuelve el payload decodificado del token
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null; // Si el token es inválido, devolvemos null
  }
};

export default decodeToken;

