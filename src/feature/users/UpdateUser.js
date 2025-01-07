import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/UpdateUser.css' // Importar los estilos

const UpdateUser = () => {
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
    const { id } = useParams(); // Obtener el id del usuario desde los parámetros de la URL

    useEffect(() => {
        // Función para obtener los datos del usuario
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserData(response.data); // Suponiendo que la respuesta contiene los datos del usuario
            } catch (err) {
                setError('Error loading user data');
            }
        };

        fetchUserData();
    }, [id]); // El efecto se ejecuta cuando el id cambia

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        try {
            // Realizar la solicitud PUT para actualizar los datos del usuario
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${id}`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            // Redirigir a la lista de usuarios después de la actualización
            navigate('/admin/users');
        } catch (err) {
            setError('Error updating user');
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
            <h1>Update User Profile</h1>
            <p>Edit user details and click save</p>
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
              <label>Username</label>
              <input
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                required
              />
              
              <label>Name</label>
              <input
                type="text"
                value={userData.nombre}
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                required
              />
              
              <label>Surname</label>
              <input
                type="text"
                value={userData.apellidos}
                onChange={(e) => setUserData({ ...userData, apellidos: e.target.value })}
                required
              />
              
              <label>Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
              
              <label>Role</label>
              <input
                type="text"
                value={userData.rol}
                onChange={(e) => setUserData({ ...userData, rol: e.target.value })}
                required
              />
              
              <label>Plan</label>
              <input
                type="text"
                value={userData.plan}
                onChange={(e) => setUserData({ ...userData, plan: e.target.value })}
                required
              />
            </div>
    
            <button type="submit" className="btn">Update</button>
          </form>
        </div>
      );
    }

export default UpdateUser;

