import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const [user, setUser] = useState(null); // Almacenar la información del usuario
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token desde localStorage
                // Solicitar los datos del usuario, incluyendo el token en los encabezados
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}` // Agregar el token al header Authorization
                        }
                    }
                );
                setUser(response.data); // Guardar los datos del usuario
            } catch (err) {
                setError(err.message); // Si ocurre un error, guardar el mensaje
            } finally {
                setLoading(false); // Cambiar el estado cuando termine la carga
            }
        };

        fetchUser(); // Llamada a la API cuando se monta el componente
    }, [id]); // Ejecutar nuevamente cuando el ID cambie

    if (loading) return <div>Loading...</div>; // Mostrar mientras carga
    if (error) return <div>Error: {error}</div>; // Mostrar si hay un error

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>{user.nombre} {user.apellidos}</h1>
                <p>{user.username}</p>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
                <p><strong>Plan:</strong> {user.plan}</p>
                <p><strong>Lista de Lecturas:</strong> {user.listaLecturasId && user.listaLecturasId.length > 0 ? 
                    <ul className="profile-list">
                        {user.listaLecturasId.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul> : 'No hay lecturas.'}</p>
                <p><strong>Número de Descargas:</strong> {user.numDescargas}</p>
                <p><strong>Reseñas:</strong> {user.resenasId && user.resenasId.length > 0 ? 
                    <ul className="profile-list">
                        {user.resenasId.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul> : 'No hay reseñas.'}</p>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
    
};

export default Profile;
