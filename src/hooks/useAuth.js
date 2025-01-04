import decodeToken from "../utils/jwtDecode";

export const getToken = () => {
    console.log("getToken:"+localStorage.getItem('token'));
    return localStorage.getItem('token');
};

export const getUserRole = () => {
    const token = getToken();
    console.log("getUserRole:"+token);
    if (!token) return null;
  
    const decoded = decodeToken(token); // Usa la función decodificadora
    console.log("getUserRoleDecode:"+decoded);
    return decoded ? decoded.rol : null;
};

export const fetchWithAuth = async (url, options = {}) => {
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
    localStorage.removeItem('token');
    window.location.href = '/'; 
    throw new Error('Token expirado. Por favor, inicia sesión de nuevo.');
  }

  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }

  return response.json();
};
