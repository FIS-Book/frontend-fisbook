import React, { useState, useEffect } from 'react';
import { useCheckTokenExpiration } from '../../hooks/usecheckTokenExpiration'; // Importa el hook
import axios from 'axios';
import '../../assets/styles/Users.css';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/CatalogueComponents/HomeButton';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Almacena el usuario seleccionado
    const navigate = useNavigate(); // Usar useNavigate fuera del handleUpdate

    // Verificar si el token ha expirado al cargar la página
    useCheckTokenExpiration();

    // Carga la lista de usuarios cuando la página se carga
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const respuesta = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token almacenado
                    },
                });
                console.log("Usuarios cargados:", respuesta.data); // Verifica los datos de los usuarios
                setUsuarios(respuesta.data);
            } catch (err) {
                setError('Error al cargar los usuarios');
            } finally {
                setCargando(false);
            }
        };

        obtenerUsuarios();
    }, []);

    // Función para eliminar el usuario seleccionado
    const handleEliminar = async () => {
        if (!usuarioSeleccionado || !usuarioSeleccionado.id) {
            alert('No se ha seleccionado ningún usuario o ID inválido');
            return;
        }
    
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${usuarioSeleccionado.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioSeleccionado.id));
            setUsuarioSeleccionado(null); // Deselecciona al usuario después de eliminarlo
        } catch (err) {
            console.error('Error al eliminar el usuario:', err.response || err.message || err);
            setError('Error al eliminar el usuario');
        }
    };

    // Función para actualizar el usuario seleccionado
    const handleActualizar = () => {
        if (!usuarioSeleccionado) {
            alert('No se ha seleccionado ningún usuario');
            return;
        }

        // Redirigir al formulario de actualización del usuario
        navigate(`/admin/users/${usuarioSeleccionado.id}/update`);
    };

    const handleSeleccionarUsuario = (usuario) => {
        console.log("Usuario seleccionado:", usuario); // Verifica qué usuario estás seleccionando
        if (usuarioSeleccionado && usuarioSeleccionado.id === usuario.id) {
            setUsuarioSeleccionado(null); // Deselecciona si el usuario ya está seleccionado
        } else {
            setUsuarioSeleccionado(usuario); // Selecciona el usuario
        }
    };

    const handleSearchUser = async () => {
        const userId = prompt('Ingresa el ID del usuario que deseas buscar:');
        if (userId) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Usando el token guardado
                    },
                });
                setUsuarios([response.data]); // Muestra solo el usuario encontrado
                setError(''); // Restablece el error si la búsqueda es exitosa
            } catch (err) {
                console.error('Error al buscar el usuario:', err.response || err.message || err);
                setError('Usuario no encontrado');
            }
        }
    };

    return (
        <div>
            <h1>Usuarios de Fisbook</h1>
            {error && <p className="error-message">{error}</p>}
            <HomeButton onClick={() => navigate('/homePage')} />
            
            {/* Botones generales */}
            <div className="buttons-container">
                <button onClick={handleSearchUser}>Buscar</button>
                <button onClick={() => navigate('/admin/users/create')}>Crear</button>
                <button onClick={handleActualizar} disabled={!usuarioSeleccionado}>Actualizar</button>
                <button onClick={handleEliminar} disabled={!usuarioSeleccionado}>Eliminar</button>
            </div>

            {cargando ? (
                <p>Cargando...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => {
                            console.log("Usuario en la lista:", usuario); // Verifica los datos de cada usuario
                            return (
                                <tr 
                                    key={usuario.id}
                                    onClick={() => handleSeleccionarUsuario(usuario)} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: usuarioSeleccionado && usuarioSeleccionado.id === usuario.id ? 'lightblue' : 'transparent'
                                    }}
                                >
                                    <td>{usuario.id}</td>
                                    <td>{usuario.username}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellidos}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol}</td>
                                    <td>{usuario.plan}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Usuarios;

