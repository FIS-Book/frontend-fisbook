import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/UpdateUser.css'; // Reutiliza el CSS que ya tienes

function NewUser() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        username: '',
        email: '',
        password: '',
        plan: '',
        rol: '',
        listaLecturasId: [],
        numDescargas: 0,
        resenasId: [],
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await axios.post(
                `${process.env.REACT_APP_BASE_URL || ""}/api/v1/auth/users/register`, 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setSuccess(true);
            setFormData({
                nombre: '',
                apellidos: '',
                username: '',
                email: '',
                password: '',
                plan: '',
                rol: '',
                listaLecturasId: [],
                numDescargas: 0,
                resenasId: [],
            });
        } catch (err) {
            console.error(err);
            setError('Error al guardar el usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Añadir Nuevo Usuario</h1>
                <p>Introduce los datos del usuario</p>
            </div>
            <form className="profile-details" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Introduce el nombre"
                    required
                />

                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Introduce los apellidos"
                    required
                />

                <label htmlFor="username">Nombre de Usuario</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Introduce un nombre de usuario único"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Introduce el email"
                    required
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Introduce la contraseña"
                    required
                />

                <label htmlFor="plan">Plan</label>
                <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Selecciona un plan</option>
                    <option value="Plan1">Plan1</option>
                    <option value="Plan2">Plan2</option>
                    <option value="Plan3">Plan3</option>
                </select>

                <label htmlFor="rol">Rol</label>
                <select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Selecciona un rol</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Usuario creado con éxito.</p>}

                <button type="submit" className="btn">Guardar</button>
            </form>
            <button
                className="btn"
                onClick={() => navigate('/admin/users')}
            >
                Volver a la Lista
            </button>
        </div>
    );
}

export default NewUser;
