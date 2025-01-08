import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importar la librería para decodificar el token
import '../../assets/styles/UpdateUser.css'; // Importar los estilos

const UpdateMyProfile = () => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        username: '',
        plan: '',
        rol: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener el id del usuario a partir del token
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token)._id : null; // Decodificar el token y obtener el id del usuario

    useEffect(() => {
        if (!userId) {
            setError('ID del usuario no disponible en el token');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (err) {
                setError('Error al cargar los datos del usuario');
            }
        };

        fetchUserData();
    }, [userId, token]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${userId}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Redirigir a la lista de usuarios después de la actualización
            navigate('/users/me');
        } catch (err) {
            setError('Error al actualizar los datos del usuario');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Actualizar Perfil de Usuario</h1>
                <p>Edita los datos del usuario y guarda los cambios</p>
            </div>
          
            {error && <p className="error-message">{error}</p>}
          
            <form onSubmit={handleSubmit}>
                <div className="profile-avatar">
                    {userData.avatar ? (
                        <img src={userData.avatar} alt="User Avatar" />
                    ) : (
                        <div className="profile-avatar-initials">
                            {userData.username?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
    
                <div className="profile-details">
                    <label>Nombre de usuario</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Apellidos</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={userData.apellidos}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
    
                <button type="submit" className="btn btn-danger">Actualizar</button>
                <button type="button" className="btn btn-danger" onClick={() => navigate('/users/me')}>Cancelar</button>
            </form>
        </div>
    );
};

export default UpdateMyProfile;




