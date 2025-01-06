import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import '../../assets/styles/MyProfile.css';

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

    const handleEditClick = () => {
        navigate(`/admin/users/${userData._id}/update`);
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
                <form className="profile-form">
                    <div className="profile-field">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" value={userData.nombre} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="apellidos">Apellido:</label>
                        <input type="text" id="apellidos" value={userData.apellidos} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" value={userData.username} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input type="email" id="email" value={userData.email} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="rol">Rol:</label>
                        <input type="text" id="rol" value={userData.rol} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="plan">Plan:</label>
                        <input type="text" id="plan" value={userData.plan} readOnly />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="lecturas">Lista de Lecturas:</label>
                        <textarea id="lecturas" value={userData.listaLecturasId.join(", ")} readOnly></textarea>
                    </div>
                    <div className="profile-field">
                        <label htmlFor="descargas">Número de Descargas:</label>
                        <input type="number" id="descargas" value={userData.numDescargas} readOnly />
                    </div>

                    <button onClick={() => navigate(`/admin/users/${userData._id}/update`)}>Editar perfil</button>
                    <button className="btn btn-danger" type="button" onClick={handleLogout}>Cerrar sesión</button>
                </form>
            )}
        </div>
    );
}

export default MyProfile;




