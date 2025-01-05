// src/components/Authentication/useCheckTokenExpiration.js
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useCheckTokenExpiration = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExpiration = localStorage.getItem('tokenExpiration'); // Obtener la fecha de expiración

        if (!tokenExpiration) {
            navigate('/'); // No hay fecha de expiración, redirige al login
            return;
        }

        const currentTime = Date.now(); // Fecha actual en milisegundos
        if (parseInt(tokenExpiration) < currentTime) {
            localStorage.removeItem('token'); // Eliminar el token si ha expirado
            localStorage.removeItem('tokenExpiration'); // Eliminar la fecha de expiración
            navigate('/'); // Redirigir al login
        }
    }, [navigate]);
};



