import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import '../../assets/styles/Profile.css';

function MyProfile() {
    const [userData, setUserData] = useState(null);
    const [readingLists, setReadingLists] = useState([]);
    const [loadingReadings, setLoadingReadings] = useState(true);
    const [loading, setLoading] = useState(true);
    const [userReviews, setUserReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    
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

    useEffect(() => {
        const fetchReadingLists = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            // Decodificar el token para obtener el ID del usuario
            const decodedToken = jwtDecode(token);
            const userId = decodedToken._id; // Cambia esto según el formato de tu token
    
            try {
                // Hacer una solicitud al endpoint para obtener las listas de lecturas
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL || ""}/api/v1/readings?userId=${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Agregar el token al header Authorization
                        }
                    }
                );
                console.log('Response RL data:', response.data); // Verifica la estructura de los datos
                // Accede directamente a los géneros en la respuesta
                if (response.data.genres) {
                    setReadingLists(response.data.genres); // Actualiza el estado con el array de géneros
                }
            } catch (error) {
                console.error("Error al obtener las listas de lecturas:", error);
            } finally {
                setLoadingReadings(false);
            }
        };
    
        fetchReadingLists();
    }, [navigate]);
    

    useEffect(() => {
        const fetchUserReviews = async () => {
            setLoadingReviews(true);
            const token = localStorage.getItem('token');

            try {
                // Decodificar el token para obtener el ID del usuario
                const decodedToken = jwtDecode(token);
                const userId = decodedToken._id; // Cambia esto según el formato de tu token
                if (!userId) throw new Error('ID del usuario no encontrado en el token');

                // Obtener todas las reseñas del usuario
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL || ''}/api/v1/reviews/users/${userId}/bk`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUserReviews(response.data); // Almacena las reseñas en el estado
            } catch (error) {
                console.error('Error al obtener las reseñas del usuario:', error);
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchUserReviews();
    }, []);

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
                    <p><strong>Listas de Lecturas:</strong></p>
                    {loadingReadings ? (
                        <p>Cargando listas de lecturas...</p>
                    ) : readingLists.length > 0 ? (
                        <ul className="profile-list">
                            {readingLists.map((list, index) => (
                                <li key={index}>
                                    {list.title} - {list.genre}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay listas de lectura.</p>
                    )}
                    <p><strong>Número de Descargas:</strong> {userData.numDescargas || 0}</p>
                    <p>
                        <strong>Libros Reseñados:</strong>{' '}
                        {loadingReviews ? (
                            <p>Cargando reseñas...</p>
                        ) : userReviews.length > 0 ? (
                            <ul className="profile-list">
                                {userReviews.map((review, index) => (
                                    <li key={index}>
                                        {review.bookTitle}: {review.score}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            'No hay reseñas.'
                        )}
                    </p>
                </div>
            )}
                <button 
                    className="btn btn-danger" 
                    onClick={() => navigate('/users/me/update')} 
                    style={{
                        width: '100%',           // Asegura que el botón ocupe el 100% del ancho disponible
                        marginTop: '20px'
                    }}
                >
                    Editar Perfil
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={handleLogout} 
                    style={{
                        width: '100%',           // Asegura que el botón ocupe el 100% del ancho disponible
                        marginTop: '20px',       // Margen superior
                        backgroundColor: 'lightcoral', // Rojo claro
                        color: 'white',          // Texto blanco
                        border: 'none'           // Sin borde
                    }}
                >
                    Cerrar sesión
                </button>

        </div>
    );
}

export default MyProfile;



