import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration';  // Importa el hook
import '../../assets/styles/Profile.css'; // Importar los estilos
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const Profile = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const [user, setUser] = useState(null); // Almacenar la información del usuario
    const [readingLists, setReadingLists] = useState([]); // Almacenar listas de lecturas
    const [userReviews, setUserReviews] = useState([]); // Almacenar reseñas del usuario
    const [loading, setLoading] = useState(true); // Estado de carga
    const [loadingReadings, setLoadingReadings] = useState(true); // Estado de carga de listas de lecturas
    const [loadingReviews, setLoadingReviews] = useState(true); // Estado de carga de reseñas
    const [error, setError] = useState(null); // Estado de error

    const navigate = useNavigate();

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

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
            try {
                const token = localStorage.getItem('token'); // Obtener el token desde localStorage
                // Solicitar las reseñas del usuario
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL || ''}/api/v1/reviews/users/${id}/bk`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserReviews(response.data || []); // Guardar las reseñas del usuario
            } catch (error) {
                console.error('Error al obtener las reseñas del usuario:', error);
            } finally {
                setLoadingReviews(false); // Cambiar el estado cuando termine la carga
            }
        };

        fetchUserReviews(); // Llamada a la API cuando se monta el componente
    }, [id]);

    if (loading) return <div className="profile-container">Cargando...</div>; // Mostrar mientras carga
    if (error) return <div className="profile-container error-message">Error: {error}</div>; // Mostrar si hay un error

    const renderAvatar = user.avatar ? (
        <img
            src={user.avatar}
            alt={`${user.nombre} ${user.apellidos}`}
            className="profile-avatar"
        />
    ) : (
        <div className="profile-avatar profile-avatar-initials">
            {user.nombre && user.nombre[0].toUpperCase()}
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-header">
                {renderAvatar}
                <h1>{user.nombre} {user.apellidos}</h1>
                <p>@{user.username}</p>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
                <p><strong>Plan:</strong> {user.plan}</p>
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
                <p><strong>Número de Descargas:</strong> {user.numDescargas}</p>
                <p><strong>Reseñas:</strong></p>
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
                    <p>No hay reseñas.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;


