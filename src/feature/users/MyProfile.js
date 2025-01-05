import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import '../../assets/styles/Profile.css';

function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // Decodificar el token para obtener el ID del usuario
                const decodedToken = jwtDecode(token);
                const userId = decodedToken._id; // Cambia esto según el formato de tu token
                if (!userId) throw new Error("ID del usuario no encontrado en el token");

                // Hacer una solicitud al endpoint para obtener toda la información del usuario
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Agregar el token al header Authorization
                        }
                    }
                );

                setUserData(response.data); // Asegúrate de que el backend devuelva los datos correctos
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
                localStorage.removeItem('token'); // Elimina el token si ocurre un error crítico
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration'); 
        navigate('/');
    };

    if (loading) {
        return <p>Cargando información del usuario...</p>;
    }
    
    const renderAvatar = userData.avatar ? (
        <img
            src={userData.avatar}
            alt={`${userData.nombre} ${userData.apellidos}`}
            className="profile-avatar"
        />
    ) : (
        <div className="profile-avatar profile-avatar-initials">
            {userData.nombre && userData.nombre[0].toUpperCase()}
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-header">
                {userData ? (
                    <>
                        {renderAvatar}
                        <h1>{userData.nombre} {userData.apellidos}</h1>
                        <p>@{userData.username}</p>
                    </>
                ) : (
                    <p>No se pudo cargar la información del usuario.</p>
                )}
            </div>
            {userData && (
                <div className="profile-details">
                    <p><strong>Email:</strong> {userData.email || 'No especificado'}</p>
                    <p><strong>Rol:</strong> {userData.rol || 'Sin rol asignado'}</p>
                    <p><strong>Plan:</strong> {userData.plan || 'Sin plan seleccionado'}</p>
                    <p>
                        <strong>Lista de Lecturas:</strong> {userData.listaLecturasId && userData.listaLecturasId.length > 0 ? (
                            <ul className="profile-list">
                                {userData.listaLecturasId.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : 'No hay lecturas.'}
                    </p>
                    <p><strong>Número de Descargas:</strong> {userData.numDescargas || 0}</p>
                    <p>
                        <strong>Reseñas:</strong> {userData.resenasId && userData.resenasId.length > 0 ? (
                            <ul className="profile-list">
                                {userData.resenasId.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : 'No hay reseñas.'}
                    </p>
                    <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                </div>
            )}
        </div>
    );
}

export default MyProfile;



